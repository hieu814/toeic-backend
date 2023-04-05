/**
 * auth.js
 * @description :: routes of authentication APIs
 */

const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const authController = require('../../../controller/device/v1/authController');
const { PLATFORM } = require('../../../constants/authConstant');

router.post('/login', authController.login);

module.exports = router;