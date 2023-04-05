/**
 * @description : exports authentication strategy for device using passport.js
 * @params {Object} passport : passport object for authentication
 * @return {callback} : returns callback to be used in middleware
 */

const {
  Strategy, ExtractJwt
} = require('passport-jwt');
const { JWT, USER_TYPES } = require('../constants/authConstant');
const User = require('../model/user');
const admin = require('firebase-admin');
const devicePassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = JWT.DEVICE_SECRET;
  passport.use('device-rule',
    new Strategy(options, async (payload, done) => {
      try {
        const decodedToken = await admin.auth().verifyIdToken(payload.accessToken);
        const userRecord = await admin.auth().getUser(decodedToken.uid);

        const user = {
          id: userRecord.uid,
          email: userRecord.email,
          isActive: userRecord.disabled == false,
          userType: USER_TYPES.User
          // Add any other user information you need here
        };
        console.log({ userRecord });
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(error, {});
      }
    })
  );
};

module.exports = { devicePassportStrategy };