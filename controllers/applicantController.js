const mongodb = require('../models/database')
const ObjectId = require('mongodb').ObjectId;



// get all applicants
const getAllApplicants = async (req, res, next) => {
    //#swagger.tags=['Applicant Page']
    try {
        const result = await mongodb.getDatabase().db('student-enrollment-project').collection('student-applicants').find();
        result.toArray().then((studentApplicants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(studentApplicants)
    })
    } catch (error) {
        console.log(error);
    }
    
}

// GET one applicant by ID
const getApplicantById = async (req, res, next) => {
    //#swagger.tags=['Applicant Page']

    try {
        const applicantId = new ObjectId(req.params.id);

        const result = await mongodb.getDatabase().db('student-enrollment-project').collection('student-applicants').find({ _id: applicantId });
        result.toArray().then((studentApplicants) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(studentApplicants[0])
    })
    } catch (error) {
        console.log(error);
    }
    
    
}


// POST - create Applicant
const createApplicant = async (req, res, next) => {
    //#swagger.tags=['Applicant Page']

    try {
        const newApplicant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone, 
        email: req.body.email,
        homeState: req.body.homeState,
        chosenProgram: req.body.chosenProgram,
        gpa: req.body.gpa,
        }

        const result = await mongodb.getDatabase().db('student-enrollment-project').collection('student-applicants').insertOne(newApplicant);
        if (result.acknowledged > 0) {
            res.status(204).send()
        } else {
            res.status(500).json(result.error || 'An error occurred while adding this applicant student')
        }
    } catch (error) {
        console.log(error);
    }
}

const updateApplicant = async (req, res, next) => {
    //#swagger.tags=['Applicant Page']
    try {
        const applicantId = new ObjectId(req.params.id)
        const updatedApplicant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone, 
        email: req.body.email,
        homeState: req.body.homeState,
        chosenProgram: req.body.chosenProgram,
        gpa: req.body.gpa,
        }
        const result = await mongodb.getDatabase()
        .db('student-enrollment-project')
        .collection('student-applicants')
        .replaceOne({ _id: applicantId }, updatedApplicant);
    
    if (result.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(result.error || 'An error occurred while updating this Applicant student')
    }
    } catch (error) {
        console.log(error);
    }
}


// DELETE
const deleteApplicant = async (req, res) => {
    //#swagger.tags=['Applicant Page']
    try {
        const applicantId = new ObjectId(req.params.id)

        const result = await mongodb.getDatabase()
        .db('student-enrollment-project')
        .collection('student-applicants')
        .deleteOne({ _id: applicantId });
    
        if (result.deletedCount > 0) {
            res.status(204).send()
        } else {
            res.status(500).json(result.error || 'An error occurred while deleting this applicant student')
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllApplicants,
    getApplicantById,
    createApplicant,
    updateApplicant,
    deleteApplicant
}