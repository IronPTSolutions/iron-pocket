const createError = require('http-errors');
const urlMetadata = require('url-metadata');
const Link = require('../models/link.model');

//** TODO: Links CRUD actions: list, detail, create, update */

module.exports.list = (req, res, next) => {
  Link.find()
    .then(links => res.json(links))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  res.json(req.link)    
}

module.exports.delete = (req, res, next) => {
  Link.deleteOne({ _id : req.link.id})
    .then(() => res.status(204).send())
    .catch(next)
}


 module.exports.create = (req, res, next) => {
// https://www.npmjs.com/package/url-metadata#usage
// https://mongoosejs.com/docs/api.html#document_Document-validate
  
   link = { url } = req.body; 

   new Link(link).validate('url')
    .then(() => urlMetadata(url))
    .then(metadata => { 
     link.title = metadata.title;
     link.image = metadata.image;
     link.description = metadata.description;
     link.keywords = metadata.keywords.split(',');

     if (link.url !== req.url) {
       res.status(201).json(link)  
       Link.create(link);
       
     } else if ( link.url === req.url) {
      next(createError(400, 'This url has already been added'))
     }  else {
      createError(error)
    }
    })
  
    .catch(error => next(error))  
}

module.exports.edit = (req, res, next) => {

  const link = {title, image, description, keywords} = req.body
  Object.assign(req.link, link)
  req.link.save()
  .then(link => res.json(link))
  .catch(next)


}
