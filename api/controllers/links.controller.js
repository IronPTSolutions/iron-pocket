const createError = require('http-errors');
const urlMetadata = require('url-metadata');
const Link = require('../models/link.model');

//** TODO: Links CRUD actions: list, detail, create, update */

module.exports.list = (req, res, next) => {
  Link.find()
    .then(links => res.json(links))
    .catch(error => next(error));
}

module.exports.detail = (req, res, next) => res.json(req.link)

module.exports.delete = (req, res, next) => {
  Link.deleteOne({ _id: req.link.id })
    .then(() => res.status(204).send())
    .catch(error => next(error))
}

module.exports.create = (req, res, next) => {

  // We are receiving only the link url at the http request body
  // req.body => { url: "https://something.com" }
  // but we need more link's metadata before store it in the database: title, description, image...
  // With the urlMetadata library we can request the link metadata as a promise: https://www.npmjs.com/package/url-metadata#usage
  // Please don't freak out with documentation! it's just a promise!: urlMetadata(url).then(metadata => {}).catch(error => next(error))

  const { url, keywords } = req.body;
  // We need validate the url before try to obtain the metadata, we can validate url against the mongoose model
  new Link({ url }).validate('url')
    .then(() => urlMetadata(url))
    .then(metadata => {
      const data = { title, description, image } = metadata;
      data.image = data.image || 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'
      return Link.create({ url, keywords, ...data })
    })
    .then(link => res.status(201).json(link))
    .catch(error => next(error))
}

module.exports.edit = (req, res, next) => {
  const data = { title, description, image, keywords } = req.body;
  const link = req.link;
  Object.assign(link, data);
  link.save()
    .then(link => res.json(link))
    .catch(error => next(error))
}
