const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URL_PATTERN = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/

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
      required: 'Please, provide an url address',
      match: [URL_PATTERN, 'Please enter a valid URL']
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    keywords: {
      type: [String],
      default:''
    }
  },
  {
    timestamps: true,
    // TODO: toJSON transformation
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
