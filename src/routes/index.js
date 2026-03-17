const newsRoutes = require('./news')
const siteRoutes = require('./site')

function route(app) {
    app.use('/news', newsRoutes)
    app.use('/', siteRoutes)

    // app.get('/search', (req, res) => {
    //     console.log('req-get-search',req.query.q)
    //     res.render('search')
    // })

    // app.post('/search', (req, res) => {
    //     console.log('req-post-search',req.body)
    //     res.send('search')
    // })
}

module.exports = route