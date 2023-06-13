/**
 * translate.js
 * @description :: TRANSLATE API routes
 */

const express = require('express');
const router = express.Router();
const { translate } = require('../../../controller/translateController');
const { PLATFORM } = require('../../../constants/authConstant');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/translate').post(auth(PLATFORM.DEVICE), checkRolePermission, translate);
module.exports = router;
