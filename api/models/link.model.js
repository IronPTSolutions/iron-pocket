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
      required: 'URL is required',
      validate: {
        validator: function (url) {
          try {
            new URL(url);
            return true
          } catch (error) {
            return false;
          }
        },
        message: () => 'URL is not valid'
      }
    },
    title: String,
    description: String,
    image: {
      type: String,
      default: 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'
    },
    keywords: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
