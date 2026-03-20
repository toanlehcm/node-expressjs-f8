const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/', courseController.index); // must be last because it will match all routes.
router.get('/:slug', courseController.show);

module.exports = router;
