const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URL_PATTERN=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
/**
  | Attribute   | Type     | Validation               |
  |-------------|----------|--------------------------|
  | url         | String   | Required, must be an URL |
  | title       | String   |                          |
  | description | String   |                          |
  | image       | String   |                          |
  | keywords    | [String] | default empty            |
 */

const linkSchema = new Schema(
  {
    url: {
      type: String, 
      required: 'URL is required', 
      match: [URL_PATTERN, 'URL not valid']
    }, 
    title: String,
    description: String, 
    image: String
  },
  {
    timestamps: true,
    // TODO: toJSON transformation
    toJSON: {
      virtuals: true, 
      transform: function(doc, ret) {
        ret.id = ret._id; 
        delete ret._v; 
        delete ret._id; 
        return ret;
      }
    }
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
