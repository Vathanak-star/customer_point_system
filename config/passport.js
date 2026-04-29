const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const passport = require('passport');
const db = require('../models');
const User = db.User;
require('dotenv').config()

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
}

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await User.findByPk(jwt_payload.id);
        if(!user) {
            return done(null,false);
        }

        return done(null,user);
    } catch (error) {
        return done(error, false)
    }
}));

module.exports = passport;