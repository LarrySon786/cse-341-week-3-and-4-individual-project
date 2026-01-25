const { body, validationResult } = require('express-validator');

// ***
// ENROLLMENT VALIDATION RULES
// ***

const enrolledValidationRules = () => {
    return [
        body('firstName').trim().isString().notEmpty().withMessage('Please enter a first name'),
        body('lastName').trim().isString().notEmpty().withMessage('Please enter a last name'),
        body('phone').trim().isString().notEmpty().withMessage('Please enter a valid phone number'),
        body('email').isEmail().trim().notEmpty().withMessage('Please enter a valid email'),
        body('homeState').trim().isString().notEmpty().withMessage('Please enter a homeState'),
        body('program').trim().isString().notEmpty().withMessage('Please enter a enrolled program'),
    ]
}

// ***
// APPLICATION VALIDATION RULES
// ***
const applicantValidationRules = () => {
    return [
        body('firstName').trim().isString().notEmpty().withMessage('Please enter a first name'),
        body('lastName').trim().isString().notEmpty().withMessage('Please enter a last name'),
        body('phone').trim().isString().notEmpty().withMessage('Please enter a valid phone number'),
        body('email').isEmail().trim().notEmpty().withMessage('Please enter a valid email'),
        body('homeState').trim().isString().notEmpty().withMessage('Please enter a homeState'),
        body('chosenProgram').trim().isString().notEmpty().withMessage('Please enter a education program'),
        body('gpa').trim().isString().notEmpty().withMessage('Please enter a GPA'),
    ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    enrolledValidationRules,
    applicantValidationRules,
    validate
}