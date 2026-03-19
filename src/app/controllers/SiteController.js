const Course = require('../models/Course');

class SiteController {
    // function constructor.
    // GET /
    // index(req, res) {
    //     res.render('home');
    // }

    async index(req, res) {
        try {
            // Using await to "wait" mongoose++ find data.
            const courses = await Course.find({});
            console.log('Courses:', courses);
            res.json(courses);
        } catch (err) {
            // If there is an error, it will jump to this catch block.
            console.log('Error fetching courses:', err);
            res.status(400).json({ error: 'Failed to fetch courses' });
        }
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController(); // Creat an instance of the NewsController class to export.
