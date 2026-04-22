const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storeCourses(req, res) {
        // res.json(res.locals.sort); // Debug.
        let courseQuery = Course.find({});

        // Check and apply sort.
        if (req.query._sort !== undefined) {
            const isValidType = ['asc', 'desc'].includes(req.query.type);
            const sortType = isValidType ? req.query.type : 'desc';
            courseQuery = courseQuery.sort({
                [req.query.column]: sortType
            });
        }
        
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
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
