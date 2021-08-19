const createError = require('http-errors')
const Link = require('../models/link.model')

module.exports.findLink = (req, res, next) => {
    const id = req.params.id

    Link.findById(id)
        .then(link => {
            if (link) {
                req.link = link;
                next();
            } else {
                next(createError(404, 'Resource not found'))
            }
        })
        .catch(next)
}

module.exports.linkExists = (req, res, next) => {

    
    Link.findOne({ url: req.body.url})
    .then(link => {
        if (link) {             
            req.url = link.url;
            next();
        } else {
            next()
        }
    })
    .catch(next)
}