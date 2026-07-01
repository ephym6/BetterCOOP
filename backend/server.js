require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');

const connectDB      = require('./config/db');
const errorHandler   = require('./middleware/errorHandler');

const authRoutes     = require('./routes/authRoutes');
const memberRoutes   = require('./routes/memberRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const dividendRoutes = require('./routes/dividendRoutes');
const auditRoutes    = require('./routes/auditRoutes');

// ── Connect to database ───────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Global middleware ─────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',  // Vite dev server
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', project: 'BetterCOOP', timestamp: new Date().toISOString() });
});

// ── API routes ────────────────────────────────────────────────────────────────
//   FR-01: auth
app.use('/api/auth',      authRoutes);
//   FR-02: member management
app.use('/api/members',   memberRoutes);
//   FR-03: delivery logging
app.use('/api/deliveries', deliveryRoutes);
//   FR-04/05/06: dividend sessions, payouts, statements
app.use('/api/dividend',  dividendRoutes);
//   FR-07: audit trail
app.use('/api/audit',     auditRoutes);

// ── Mock endpoints for compatibility ────────────────────────────────────────────
app.get('/api/transactions', (req, res) => {
  res.json([
    {
      _id: 'tx_1',
      memberId: '#BC-9923',
      memberName: 'Adebayo Olatunji',
      type: 'Loan Repayment',
      date: 'Oct 24, 2023',
      amount: 25000,
      status: 'COMPLETED',
      reference: 'Direct Pay'
    },
    {
      _id: 'tx_2',
      memberId: '#BC-8812',
      memberName: 'Chidi Eze',
      type: 'Cassava Delivery',
      date: 'Oct 24, 2023',
      weightKg: 450,
      status: 'PROCESSING',
      reference: 'Log #CA-904'
    }
  ]);
});

app.post('/api/transactions', (req, res) => {
  const txData = req.body;
  const newTx = {
    ...txData,
    _id: `tx_${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
  res.status(201).json(newTx);
});

let settingsMock = {
  cooperativeName: 'BetterCOOP Agricultural Union',
  taxRegistrationNumber: 'KRA-PIN-COOP9901Z',
  currency: 'Ksh',
  minimumShareCapital: 5000,
  interestRateSavingsDecimal: 0.145,
  interestRateLoansDecimal: 0.045,
  enableSmsNotifications: true,
  enableTwoFactorAuth: true
};

app.get('/api/settings', (req, res) => {
  res.json(settingsMock);
});

app.put('/api/settings', (req, res) => {
  settingsMock = { ...settingsMock, ...req.body };
  res.json(settingsMock);
});

app.get('/api/users', (req, res) => {
  res.json([
    { _id: 'usr_1', email: 'admin@bettercoop.agri', fullName: 'Admin User', role: 'SUPER_ADMIN', status: 'ACTIVE' },
    { _id: 'usr_2', email: 'sarah.miller@bettercoop.agri', fullName: 'Sarah Miller', role: 'COOP_ADMIN', status: 'ACTIVE' },
    { _id: 'usr_3', email: 'samuel.mwangi@bettercoop.agri', fullName: 'Samuel Mwangi', role: 'SENIOR_OFFICER', status: 'ACTIVE' }
  ]);
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BetterCOOP API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

module.exports = app;
