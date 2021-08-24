const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URL_PATTERN= /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

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
      match: [URL_PATTERN, 'URL is not valid'],
      required: 'A link must be inluded'
    },
    title: String,
    description: String,
    image: String,
    keywords: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        return ret;
      }
    }
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
