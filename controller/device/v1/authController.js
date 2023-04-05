/**
 * authController.js
 * @description :: exports authentication methods
 */

const User = require('../../../model/user');
const dbService = require('../../../utils/dbService');
const userTokens = require('../../../model/userTokens');
const dayjs = require('dayjs');
const userSchemaKey = require('../../../utils/validation/userValidation');
const validation = require('../../../utils/validateRequest');
const authConstant = require('../../../constants/authConstant');
const authService = require('../../../services/auth');

const login = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      let result = await authService.loginWithAccessToken(authConstant.PLATFORM.DEVICE, token)
      return res.success({
        data: result.data,
        message: 'Login Successful'
      });
    } else {
      // token does not exist, handle the error
      return res.badRequest({ message: "token does not exist" });

    }
  } catch (error) {
    return res.internalServerError({ data: error.message });
  }
};


module.exports = {
  login,
};