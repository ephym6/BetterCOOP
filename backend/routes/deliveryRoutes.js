const express = require('express');
const router  = express.Router();

const {
  logDelivery, getDeliveries, getDelivery, voidDelivery,
} = require('../controllers/deliveryController');
const { protect, restrictTo } = require('../middleware/auth');
const {
  createDeliveryValidator, voidDeliveryValidator,
} = require('../validators/deliveryValidators');

router.use(protect);

router.route('/')
  .get(getDeliveries)                                        // admin: all; member: own
  .post(restrictTo('admin'), createDeliveryValidator, logDelivery);

router.route('/:id')
  .get(getDelivery);

router.patch('/:id/void', restrictTo('admin'), voidDeliveryValidator, voidDelivery);

module.exports = router;
