const express = require('express');
const router  = express.Router();

const { getAuditLogs } = require('../controllers/auditController');
const { protect, restrictTo } = require('../middleware/auth');

router.use(protect, restrictTo('admin'));

router.get('/', getAuditLogs);

module.exports = router;
