const express = require('express');
const router  = express.Router();

const {
  createMember, getAllMembers, getMember, getMyProfile,
  updateMember, deactivateMember,
} = require('../controllers/memberController');
const { protect, restrictTo } = require('../middleware/auth');
const {
  createMemberValidator, updateMemberValidator,
} = require('../validators/memberValidators');

router.use(protect);  // all member routes require auth

router.get('/me', getMyProfile);  // any logged-in user (member fetches own profile)

router.route('/')
  .get(restrictTo('admin'),   getAllMembers)
  .post(restrictTo('admin'),  createMemberValidator, createMember);

router.route('/:id')
  .get(getMember)                                          // admin: any member; member: own only (enforced in controller)
  .patch(restrictTo('admin'), updateMemberValidator, updateMember);

router.patch('/:id/deactivate', restrictTo('admin'), deactivateMember);

module.exports = router;
