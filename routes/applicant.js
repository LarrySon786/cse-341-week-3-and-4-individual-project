const router = require('express').Router();
const applicantController = require('../controllers/applicantController');
const swagger = require('./swagger');
const validation = require('../validation/validate');

router.use('/', swagger);

router.get('/', applicantController.getAllApplicants);
router.get('/:id', applicantController.getApplicantById);

router.post('/', validation.applicantValidationRules(), validation.validate, applicantController.createApplicant);

router.put('/:id', validation.applicantValidationRules(), validation.validate, applicantController.updateApplicant);

router.delete('/:id', applicantController.deleteApplicant)


module.exports = router
