const mongodb = require('../models/database')
const ObjectId = require('mongodb').ObjectId;



// get all enrolled
const getAllEnrolled = async (req, res, next) => {
    //#swagger.tags=['Enrollment Page']
    const result = await mongodb.getDatabase().db('student-enrollment-project').collection('students-enrolled').find();
    result.toArray().then((studentsEnrolled) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(studentsEnrolled)
    })
}

// GET one enrolled by ID
const getEnrolledById = async (req, res, next) => {
    //#swagger.tags=['Enrollment Page']
    const enrolledId = new ObjectId(req.params.id);

    const result = await mongodb.getDatabase().db('student-enrollment-project').collection('students-enrolled').find({ _id: enrolledId });
    result.toArray().then((studentsEnrolled) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(studentsEnrolled[0])
    })
}


// POST - create enrolled
const createEnrolled = async (req, res, next) => {
    //#swagger.tags=['Enrollment Page']
    const newEnrolled = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone, 
        email: req.body.email,
        homeState: req.body.homeState,
        program: req.body.program,
    }

    const result = await mongodb.getDatabase().db('student-enrollment-project').collection('students-enrolled').insertOne(newEnrolled);
    if (result.acknowledged > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(result.error || 'An error occurred while adding this enrolled student')
    }
}

const updateEnrolled = async (req, res, next) => {
    //#swagger.tags=['Enrollment Page']
    const enrolledId = new ObjectId(req.params.id)
    const updatedEnrolled = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone, 
        email: req.body.email,
        homeState: req.body.homeState,
        program: req.body.program,
    }
    const result = await mongodb.getDatabase()
        .db('student-enrollment-project')
        .collection('students-enrolled')
        .replaceOne({ _id: enrolledId }, updatedEnrolled);
    
    if (result.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(result.error || 'An error occurred while updating this enrolled student')
    }
}

const deleteEnrolled = async (req, res) => {
    //#swagger.tags=['Enrollment Page']
    const enrolledId = new ObjectId(req.params.id)

    const result = await mongodb.getDatabase()
        .db('student-enrollment-project')
        .collection('students-enrolled')
        .deleteOne({ _id: enrolledId });
    
    if (result.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(result.error || 'An error occurred while deleting this enrolled student')
    }
}


module.exports = {
    getAllEnrolled,
    getEnrolledById,
    createEnrolled,
    updateEnrolled,
    deleteEnrolled
}