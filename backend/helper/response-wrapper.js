/** wrap(func)
 * Get the return value and errors from func,
 * and send it as a response.
 */

const wrap = (func) => ((req, res) => {
    Promise.resolve(func(req, res))
        .then(r => {
            if (typeof r === 'object'
                && r !== null
                && !Array.isArray(r)) {
                if (r._code) {
                    res.status(r._code);
                    delete r._code;
                }
                res.send(r);
            } else {
                res.send({ result: r });
            }
        })
        .catch(r => {
            console.log('Error:', r);
            if (typeof r === 'object'
                && r !== null
                && r._code) {
                res.status(r._code);
                delete r._code;
                res.send(r);
            } else if (typeof r === 'number') {
                res.status(r).send({ error: r });
            } else {
                res.status(500).send({ error: r });
            }
        });
});

module.exports = wrap;
