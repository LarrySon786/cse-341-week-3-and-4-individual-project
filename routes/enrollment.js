const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const swagger = require('./swagger');

router.use('/', swagger);


router.get('/', enrollmentController.getAllEnrolled);
router.get('/:id', enrollmentController.getEnrolledById);

router.post('/', enrollmentController.createEnrolled);

router.put('/:id', enrollmentController.updateEnrolled);

router.delete('/:id', enrollmentController.deleteEnrolled)

module.exports = router
