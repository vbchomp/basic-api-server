'use strict'

function handle404(req, res, next) {
    const errorObject = {
        status: 404,
        message: 'You will not find what what you are looking for here'
    }
    res.status(404).json(errorObject);
}

module.exports = handle404;