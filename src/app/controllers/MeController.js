const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    store(req, res) {
        Course.find({})
            .then(courses => res.render('me/stored-courses', { courses: mutipleMongooseToObject(courses) }))
            .catch(err => res.status(400).json({ error: 'Failed to fetch course' }));
    }
}

module.exports = new MeController(); // Creat an instance of the MeController class to export.
