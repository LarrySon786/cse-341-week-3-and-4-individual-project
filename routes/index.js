const router = require('express').Router();
const enrollmentRoute = require('./enrollment');
const applicantRoute = require('./applicant');
const swagger = require('./swagger');

router.use('/', swagger);

router.get('/', (req, res) => {
    //#swagger.tags=['Home Page']
    res.send('Home Page');
})

router.use('/enrollment', enrollmentRoute);

router.use('/applicant', applicantRoute)

module.exports = router;
