// Combine params, query, and body into req.args

module.exports = function (req, res, next) {
    req.args = {
        ...req.query,
        ...req.body,
    };

    next();
}
