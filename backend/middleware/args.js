// Combine params, query, and body into req.args

module.exports = function (req, res, next) {
    req.args = {
        ...req.params,
        ...(['GET', 'DELETE'].includes(req.method)
            ? req.query
            : req.body),
    };

    next();
}
