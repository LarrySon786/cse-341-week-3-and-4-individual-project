const router = require('express').Router();
const enrollmentRoute = require('./enrollment');
const applicantRoute = require('./applicant');
const swagger = require('./swagger');
const passport = require('passport')


router.use('/', swagger);

// router.get('/', (req, res) => {
//     //#swagger.tags=['Home Page']
//     res.send('Home Page');
// });

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


router.use('/enrollment', enrollmentRoute);

router.use('/applicant', applicantRoute);

module.exports = router;
