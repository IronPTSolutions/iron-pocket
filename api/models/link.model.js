const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URL_PATTERN = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

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
      required: [ true, 'URL is required'],
      unique: true,
      
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
      default: [],

    }
  },

  {
    timestamps: true,
    // TODO: toJSON transformation
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
