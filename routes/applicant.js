const router = require('express').Router();
const applicantController = require('../controllers/applicantController');
const swagger = require('./swagger');
const validation = require('../validation/validate');
const authentication = require('../validation/authenticate');

router.use('/', swagger);

router.get('/', applicantController.getAllApplicants);
router.get('/:id', applicantController.getApplicantById);

router.post('/', authentication.isAuthenticated, validation.applicantValidationRules(), validation.validate, applicantController.createApplicant);

router.put('/:id', authentication.isAuthenticated, validation.applicantValidationRules(), validation.validate, applicantController.updateApplicant);

router.delete('/:id', authentication.isAuthenticated, applicantController.deleteApplicant)


module.exports = router
