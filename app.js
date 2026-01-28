const express = require("express");
const dotenv = require("dotenv").config();
const mongodb = require('./models/database');
const app = express();
const port = 3000;
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');



// BODY PARSER for rest client requests
app.use(bodyParser.json());

// Passport Session
app
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
// SWAGGER HEADERS
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Orgin', '*')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Orgin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader(
            'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
// CORS Methods
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ orgin: '*' }))
// ROUTES
    .use('/', routes)


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));


// Serializers
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : `Logged Out`) });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
})



// ERROR HANDLING
process.on('uncaughtException', error => {
 logError(error)

 if (!isOperationalError(error)) {
 process.exit(1)
 }
})


// SET-UP PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

mongodb.initDb((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Database is listening.")
    }
})


