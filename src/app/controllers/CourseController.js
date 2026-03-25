const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res) {
        Course.findOne({ slug: req.params.slug })
            .then(course => res.render('courses/show', { course: mongooseToObject(course) }))
            .catch(err => res.status(400).json({ error: 'Failed to fetch course' }));
    }

    // [GET] /courses/create
    create(req, res) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(err => res.status(400).json({ error: 'Failed to create course' }));
    }

    // [GET] /courses/:id/edit
    edit(req, res) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch(err => res.status(400).json({ error: 'Failed to fetch course' }));
    }

    // [PUT] /courses/:id
    update(req, res) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => res.status(400).json({ error: 'Failed to update course' }));
    }

    // [DELETE] /courses/:id
    destroy(req, res) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => res.status(400).json({ error: 'Failed to delete course' }));
    }
}

module.exports = new CourseController(); // Creat an instance of the CourseController class to export.
