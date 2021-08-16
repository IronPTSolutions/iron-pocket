const createError = require('http-errors');
const urlMetadata = require('url-metadata');
const Link = require('../models/link.model');

//** TODO: Links CRUD actions: list, detail, create, update */
module.exports.list = (req, res, next) => {
  Link.find()
  .then(links => res.json(links))
  .catch(error => next(error))
}

module.exports.detail = (req, res, next) => {
  Link.findById(req.params.id)
  .then(link => {
    if(!link) {
      next(createError(404, 'Link not found'))
    }else{
      res.json(link)
    }
  })
  
}

module.exports.delete = (req, res, next) => {
  Link.findByIdAndDelete(req.params.id)
  .then(link => {
    if(!link) {
      next(createError(404, 'Link not found'))
    }else{
      res.status(204).send()
    }
  })
  .catch(error => next(error))
}

 module.exports.create = (req, res, next) => {
  link = { url } = req.body
  
  new Link({ url }).validate('url')
    .then(() => urlMetadata(url))
    .then(metadata => {
        link.title = metadata.title; 
        link.description = metadata.description; 
        link.image = metadata.image;
        return Link.create(link)
    })
    .then(link => res.status(201).json(link))
    .catch(error => next(error))
}