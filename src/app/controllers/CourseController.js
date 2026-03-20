const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    show(req, res) {
        Course.findOne({ slug: req.params.slug })
            .then(course => res.render('courses/show', { course: mongooseToObject(course) }))
            .catch(err => res.status(400).json({ error: 'Failed to fetch course' }));
    }
}

module.exports = new CourseController(); // Creat an instance of the CourseController class to export.
