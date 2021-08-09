const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      required: 'An URL must be inluded'
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
    // TODO: toJSON transformation
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
