const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const URL_PATTERN = /^(ftp|http|https):\/\/[^ "]+$/;

const linkSchema = new Schema(
  {
    url: {
      type: String,
      match: [URL_PATTERN, 'Url is not valid'],
      required: 'Url is required'
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
      default: []
    },
  }, { 
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
