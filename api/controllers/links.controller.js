const createError = require('http-errors');
const urlMetadata = require('url-metadata');
const Link = require('../models/link.model');

//** TODO: Links CRUD actions: list, detail, create, update */


module.exports.create = (req, res, next) => {

  const url = req.body.url
  new Link({ url }).validate('url')
    .then(() => urlMetadata(url))
    .then(metadata => {
      const info = { title, image, description,keywords } = metadata
      return Link.create({ url, ...info })
    })
    .then(link => res.status(201).json(link))
    .catch(error => next(error))
}

module.exports.list = (req, res, next) => {

  Link.find()
    .then(links => res.json(links))
    .catch(next)
}

module.exports.detail = (req, res, next) => {

  res.json(req.link)
}

module.exports.delete = (req, res, next) => {

  Link.findOne({ _id: req.link.id })
    .then(() => res.status(204).send())
    .catch(next)
}

module.exports.update = (req, res, next) => {

  const link = req.link 
  const url = { title, description, image, keywords } = req.body 
  Object.assign(link, url)
  link.save()
    .then(link => res.json(link))
    .catch(next)
}