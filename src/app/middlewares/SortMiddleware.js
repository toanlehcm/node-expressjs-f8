module.exports = function sortMiddleware() {
    return (req, res, next) => {
        res.locals.sort = {
            enabled: false,
            type: 'default'
        };

        if(req.query._sort !== undefined){
            res.locals.sort.enabled = true;
            res.locals.sort.column = req.query.column;
            res.locals.sort.type = req.query.type;
        }

        next();
    }
}