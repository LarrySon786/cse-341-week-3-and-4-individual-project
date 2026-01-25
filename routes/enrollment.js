const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const swagger = require('./swagger');
const validation = require('../validation/validate');

router.use('/', swagger);


router.get('/', enrollmentController.getAllEnrolled);
router.get('/:id', enrollmentController.getEnrolledById);

router.post('/', validation.enrolledValidationRules(), validation.validate, enrollmentController.createEnrolled);

router.put('/:id', validation.enrolledValidationRules(), validation.validate, enrollmentController.updateEnrolled);

router.delete('/:id', enrollmentController.deleteEnrolled)

module.exports = router
