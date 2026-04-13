const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storeCourses(req, res) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', { 
                    deletedCount,
                    courses: mutipleMongooseToObject(courses) 
                });
            })
            .catch(err => res.status(400).json({ error: 'Failed to fetch course' }));
        
        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', { courses: mutipleMongooseToObject(courses) }))
        //     .catch(err => res.status(400).json({ error: 'Failed to fetch course' }));
    }

    // [GET] /me/trash/courses
    trashCourses(req, res) {
        Course.findWithDeleted({ deleted: true })
            .then(courses => res.render('me/trash-courses', { courses: mutipleMongooseToObject(courses) }))
            .catch(err => res.status(400).json({ error: 'Failed to fetch course' }));
    }
}

module.exports = new MeController(); // Creat an instance of the MeController class to export.
