import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { readFileSync } from "node:fs";

const publicKey = readFileSync(`${__dirname}/../../jwtRS256.key.pub`);

const options: any = {
    issuer: 'localhost',
    // issuer: 'localhost',
    // subject: 'subject',
    // audience: 'localhost'
};

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithm: "RS256"
    // issuer: 'accounts.examplesoft.com',
    // audience: 'yourdomain.net'
};

passport.use(new Strategy(opts, function (jwt_payload, done) {
    console.log(opts);

    // console.log('jwt_payload', jwt_payload);

    // User.findOne({ id: jwt_payload.sub }, function (err, user) {
    //     if (err) {
    // return done(err, false);
    //     }
    //     if (user) {
    return done(null, { i: 'j' });
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

export { passport };