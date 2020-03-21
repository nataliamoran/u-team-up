const wrap = require('./response-wrapper');

module.exports = (app, routes) => {
    Object.keys(routes).forEach(path => {
        const r = routes[path];
        Object.keys(r)
            .forEach(method =>
                     app[method](path, wrap(r[method])));
    });
};
