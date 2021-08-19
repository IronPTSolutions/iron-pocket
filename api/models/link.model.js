const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URL_PATTERN = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/


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
      default:[]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        return ret
      }
    }
  }
)

const Link = mongoose.model('Link', linkSchema)
module.exports = Link;
