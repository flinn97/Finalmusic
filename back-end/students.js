const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();


const users = require("./users.js");
const User = users.model;
const validUser = users.valid;
//photo schema
const StudentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    firstName: String,
    lastName: String,
    email: String,
    lesson: String,
});

const Student = mongoose.model('Student', StudentSchema);
// upload photo
router.post("/", validUser, async (req, res) => {
    // check parameters
    //if (!req.file)
      //  return res.status(400).send({
        //    message: "Must upload a file."
        //});

    const student = new Student({
        user: req.user,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        lesson: req.body.lesson,
    });
    try {
        await student.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
// get my photos
router.get("/", validUser, async (req, res) => {
    // return photos
    try {
        let student = await Student.find({
            user: req.user
        }).sort({
            created: -1
        }).populate('user');
        return res.send(student);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
router.get("/student", async (req, res) => {
    try {

        let student = await Student.find({
            _id: req.query["id"]
        }).populate('user');
        return res.send(student);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
})
// get all photos
router.get("/all", async (req, res) => {
    try {
        let student = await Student.find().sort({
            created: -1
        }).populate('user');
        return res.send(student);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
module.exports = {
    model: Student,
    routes: router,
}
