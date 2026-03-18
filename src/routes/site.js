const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.use('/', siteController.index); // must be last because it will match all routes.

module.exports = router;
