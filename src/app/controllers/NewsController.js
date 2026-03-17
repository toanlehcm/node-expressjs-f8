class NewsController { // function constructor.
    // GET /news
    index(req, res) {
        res.render('news')
    }

    // GET /news/:slug. Slug is a parameter in URL.
    show(req, res) {
        res.send('news detail')
    }
}

module.exports = new NewsController() // Creat an instance of the NewsController class to export.
