const express = require('express');
const router  = express.Router();

const {
  createSession, getSessions, getSession,
  closeSession, getSessionPayouts, getMemberStatement,
} = require('../controllers/dividendController');
const { protect, restrictTo } = require('../middleware/auth');
const {
  createSessionValidator, closeSessionValidator,
} = require('../validators/dividendValidators');

router.use(protect);

// Sessions
router.route('/sessions')
  .get(getSessions)
  .post(restrictTo('admin'), createSessionValidator, createSession);

router.get ('/sessions/:id',          getSession);
router.post('/sessions/:id/close',    restrictTo('admin'), closeSessionValidator, closeSession);
router.get ('/sessions/:id/payouts',  getSessionPayouts);  // admin: all; member: own

// Member statement (FR-05)
router.get('/statement/:memberId', getMemberStatement);    // admin: any; member: own

module.exports = router;
