const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); // Use for form html.
app.use(express.json()); // Use for code js: XML HTTP request, fetch, axios, request

app.use(methodOverride('_method'))

app.use(morgan('combined'))

app.get('/middleware', 
    // Middleware 1
    function(req, res, next) {
        console.log('middleware 1');
        if(['vethuong','vevip'].includes(req.query.ve)){
            req.face = 'adjust-face';
            return next(); // Pass to next middleware.
        }else{
            res.status(403).json({
                message: 'Forbidden-Access Denied'
            });
        }
    },

    // Middleware 2
    function(req, res, next) {
        console.log('middleware 2');
        res.json({
            message: 'Success',
            face: req.face
        });
    }
)

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        
        // Custom helper.
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes
route(app);

// 127.0.0.1:3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
