const createError = require('http-errors');
const urlMetadata = require('url-metadata');
const Link = require('../models/link.model');

//** TODO: Links CRUD actions: list, detail, create, update */

module.exports.list = (req, res, next) => {
  Link.find()
    .then(links => res.json(links))
    .catch(error => next (error))
}

module.exports.detail = (req, res, next) => {
  res.json(req.link);
}


module.exports.create = (req, res, next) => {
  link = { url } = req.body
    new Link({ url }).validate('url')
        .then(() => urlMetadata(url))
        .then( metadata => {
              link.title = metadata.title;
              link.image = metadata.image;
              link.description = metadata.description;
              link.keywords = metadata.keywords;
              return Link.create(link)
            })
        .then((link) => {
              if(link) {
                res.status(201).json(link)
              } else if (error.name === 'MongoError' && error.code === 11000){
                next (new Error('This URL has been already added'))
              } else {
                next(error)
              }
            })
        .catch((error) => next(error))
  
}

module.exports.edit = (req, res, next) => {
  const data = { title, image, description, url } = req.body;
  const link = req.link;
  Object.assign(link, data);
  link.save()
    .then(link => res.json(link))
    .catch(error => next(error))
}

module.exports.delete = (req, res, next) => {
  Link.deleteOne({ _id: req.link.id })
    .then(link => res.status(204).json(link))
    .catch(error => next(error))
}




// module.exports.create = (req, res, next) => {

//   function renderWithError(error) {
//     error = createError(409, error)
//     res.status(409).json({ link: req.body, error })
//   }

  
//   Link.findOne({ link: req.body.url})
//   .then((link) => {
//     if(link) {
//       renderWithError ({ link: 'this URL has already been added'});
//     } else {
//     link = { url } = req.body
//     new Link({ url }).validate('url')
//         .then(() => urlMetadata(url))
//         .then( metadata => {
//               link.title = metadata.title;
//               link.image = metadata.image;
//               link.description = metadata.description;
//               link.keywords = metadata.keywords;
//               return Link.create(link);
//             })
//         .then((link) => {
//               if(link) {
//                 res.status(201).json(link)
//               } else {
//                 createError(error)
//               }
//             })
//         .catch((error) => next(error))
      
//     }            
//   })

// }





  



