class SiteController {
    // function constructor.
    // GET /
    index(req, res) {
        res.render('home');
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController(); // Creat an instance of the NewsController class to export.
