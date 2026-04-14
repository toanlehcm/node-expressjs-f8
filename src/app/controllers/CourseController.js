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
        // const formData = req.body; // no need to use this variable because formData use same memory space as req.body
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
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
        // Hard delete.
        // Course.deleteOne({ _id: req.params.id })
        //     .then(() => res.redirect('/me/stored/courses'))
        //     .catch(err => res.status(400).json({ error: 'Failed to delete course' }));
        
        //Soft delete.
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => res.status(400).json({ error: 'Failed to delete course' }));
    }

    // [PATCH] /courses/:id/restore
    restore(req, res) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => res.status(400).json({ error: 'Failed to restore course' }));
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(err => res.status(400).json({ error: 'Failed to force delete course' }));
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res) {
        switch(req.body.action){
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(err => res.status(400).json({ error: 'Failed to delete course' }));
                break;
            default:
                res.status(400).json({ error: 'Invalid action' });
        }
    }
}

module.exports = new CourseController(); // Creat an instance of the CourseController class to export.
