// FR-06 — SMS Notification Service (Africa's Talking)
// Sends SMS to members on: payout calculated, delivery acknowledged.
// This is a notification service ONLY — no payment or mobile-money integration (Chapter 1, §1.7).

const AfricasTalking = require('africastalking');

let smsClient = null;

const getClient = () => {
  if (!smsClient) {
    const AT = AfricasTalking({
      apiKey:   process.env.AT_API_KEY,
      username: process.env.AT_USERNAME,
    });
    smsClient = AT.SMS;
  }
  return smsClient;
};

/**
 * sendSMS
 * @param {string|string[]} to      — phone number(s) in E.164 format e.g. +254712345678
 * @param {string}          message — SMS body text (max 160 chars for single SMS)
 * @returns {Object}                — AT send response
 */
const sendSMS = async (to, message) => {
  try {
    const recipients = Array.isArray(to) ? to : [to];
    const client     = getClient();

    const response = await client.send({
      to:        recipients,
      message,
      from:      process.env.AT_SENDER_ID || 'BetterCOOP',
    });

    return { success: true, response };
  } catch (err) {
    console.error('[SMS ERROR]', err.message);
    return { success: false, error: err.message };
  }
};

// ── Pre-built message templates ───────────────────────────────────────────────

const messages = {
  /**
   * payoutReady — sent to a member when their payout figure is calculated
   * @param {string} name       — member's full name
   * @param {number} amountKes  — payout amount in KES
   * @param {string} sessionName — e.g. "Q1 2025 Harvest Cycle"
   */
  payoutReady: (name, amountKes, sessionName) =>
    `Dear ${name}, your dividend for ${sessionName} has been calculated: KES ${amountKes.toFixed(2)}. Log in to BetterCOOP to view your statement.`,

  /**
   * deliveryConfirmed — sent to a member when their delivery is logged
   * @param {string} name      — member's full name
   * @param {number} quantityKg
   * @param {string} grade
   */
  deliveryConfirmed: (name, quantityKg, grade) =>
    `Dear ${name}, your delivery of ${quantityKg}kg (Grade ${grade}) has been recorded. Thank you.`,

  /**
   * registrationWelcome — sent to a new member on registration
   * @param {string} name
   * @param {string} memberNumber
   */
  registrationWelcome: (name, memberNumber) =>
    `Welcome to BetterCOOP, ${name}! Your member number is ${memberNumber}. Contact your cooperative administrator for login credentials.`,
};

module.exports = { sendSMS, messages };
