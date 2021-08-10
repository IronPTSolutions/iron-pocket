const createError = require('http-errors');
const urlMetadata = require('url-metadata');
const Link = require('../models/link.model');

module.exports.list = (req, res, next) => {
  Link.find()
    .then(links => res.json(links))
    .catch(next);
}

module.exports.detail = (req, res, next) => {
  res.json(req.link);
}

module.exports.delete = (req, res, next) => {
  Link.deleteOne({ _id: req.link.id })
    .then(() => res.status(204).send())
    .catch(next)
}

module.exports.create = (req, res, next) => {
  link = {url} = req.body;
  new Link({ url }).validate('url')
    .then(() => urlMetadata(url))
    .then(metadata => {
      link.title = metadata.title;
      link.image = metadata.image;
      link.description = metadata.description;
      link.keywords = metadata.keywords;
      return link;
    })
    .then(link => {
      if (link) {
        res.status(201).json(link)
      } else {
        createError(error)
      }
    })
    .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {
  const data = { url, title, description, image, keywords } = req.body;
  const link = req.link;
  Object.assign(link, data);
  link.save()
    .then(link => res.json(link))
    .catch(error => next(error))
}