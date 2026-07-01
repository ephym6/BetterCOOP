// FR-04 — Dividend Calculation Service
// Called by dividendController when a session is closed.
// Calculates payout per member based on their share of total deliveries in the session.
// No money is moved — figures are recorded and displayed only (Chapter 1, §1.7).

const Delivery       = require('../models/Delivery');
const DividendPayout = require('../models/DividendPayout');
const DividendSession = require('../models/DividendSession');
const Member         = require('../models/Member');

/**
 * calculatePayouts
 * @param {Object} session  — DividendSession mongoose document (must be status='closed')
 * @returns {Object}        — { payouts: DividendPayout[], summary }
 */
const calculatePayouts = async (session) => {
  // 1. Get all non-voided deliveries in this session's date range
  const deliveries = await Delivery.find({
    deliveryDate: { $gte: session.periodStart, $lte: session.periodEnd },
    isVoided: false,
  });

  if (deliveries.length === 0) {
    throw new Error('No deliveries found in this session period. Cannot calculate payouts.');
  }

  // 2. Aggregate total kg per member
  const memberTotals = {};
  let grandTotalKg = 0;

  for (const delivery of deliveries) {
    const memberId = delivery.memberId.toString();
    memberTotals[memberId] = (memberTotals[memberId] || 0) + delivery.quantityKg;
    grandTotalKg += delivery.quantityKg;

    // Tag delivery to this session
    delivery.dividendSessionId = session._id;
    await delivery.save();
  }

  if (grandTotalKg === 0) {
    throw new Error('Total delivery quantity is zero. Cannot divide dividend pool.');
  }

  // 3. Calculate price per kg
  const pricePerKgKes = session.totalDividendPoolKes / grandTotalKg;

  // 4. Create DividendPayout records
  const payouts = [];
  for (const [memberId, totalKg] of Object.entries(memberTotals)) {
    const member = await Member.findById(memberId);
    if (!member || !member.isActive) continue;

    const grossAmount = parseFloat((totalKg * pricePerKgKes).toFixed(2));

    const payout = await DividendPayout.create({
      dividendSessionId: session._id,
      memberId,
      totalDeliveriesKg: totalKg,
      pricePerKgKes:     parseFloat(pricePerKgKes.toFixed(4)),
      grossAmountKes:    grossAmount,
    });
    payouts.push(payout);
  }

  // 5. Update session with aggregated figures
  await DividendSession.findByIdAndUpdate(session._id, {
    totalDeliveriesKg: grandTotalKg,
    pricePerKgKes:     parseFloat(pricePerKgKes.toFixed(4)),
    status:            'payouts_generated',
  });

  return {
    payouts,
    summary: {
      totalMembers:   payouts.length,
      totalDeliveriesKg: grandTotalKg,
      pricePerKgKes:  parseFloat(pricePerKgKes.toFixed(4)),
      totalPoolKes:   session.totalDividendPoolKes,
    },
  };
};

module.exports = { calculatePayouts };
