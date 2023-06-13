/**
 * translate.js
 * @description :: TRANSLATE API routes
 */

const express = require('express');
const router = express.Router();
const { translate } = require('../../controller/translateController');
const { PLATFORM } = require('../../constants/authConstant');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/translate').post(auth(PLATFORM.ADMIN), translate);
module.exports = router;
