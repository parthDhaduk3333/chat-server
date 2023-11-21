import passport from 'passport';

import passportLocal from 'passport-local';
import User from '../models/User';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
    usernameField: "email"
},
    async (email, password, cb) => {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                console.log("wrong email")
                return cb(null,false);
            } else {
                if (user.password == password) {
                    return cb(null,user)
                } else {
                    console.log("wrong password")
                    return cb(null,false)
                }
            }
        } catch (err) {
            cb(err)
        }
    }
));

passport.serializeUser((user,cb) => {
    return cb(null,user.id)
})

passport.deserializeUser(async (id,cb) => {
    try {
        const user = await User.findById(id)
        if (user) {
            return cb(null,user)
        }
    } catch (err) {
        cb(err)
    }
})


export default passport;