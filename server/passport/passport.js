const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Staff = require('../database/models/staff');

const jwtOptions = {
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.TOKEN_KEY
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done)=>{
    Staff.findById(payload.sub).then((user)=>{
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    }).catch(err=>{console.log(err); done(err, false);});
})

const localOptions={
    usernameField: 'username',
    passwordField: 'password'
};

const localLogin = new LocalStrategy(localOptions, (username, password, done)=>{
    Staff.findOne({username}).then((user)=>{
        if(!user){return done(null, false);}

        user.comparePassword(password, (err, isMatch)=>{
            if(err){console.log('b');return done(err);}
            if(!isMatch){return done(null, false);}
            return done(null, user);
        })
    }). catch(err=>{console.log(err); done(err);})
});

passport.use(jwtLogin);
passport.use(localLogin);