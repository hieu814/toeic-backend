/**
 * group_question.js
 * @description :: model of a database collection group_question
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    isDeleted: { type: Boolean },

    isActive: { type: Boolean },

    createdAt: { type: Date },

    updatedAt: { type: Date },

    exam: {
      type: Schema.Types.ObjectId,
      ref: 'exam'
    },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    questions: [{
      _id: false,
      number: { type: Number },
      question: { type: String ,default:""},
      A: { type: String ,default:""},
      B: { type: String ,default:""},
      C: { type: String ,default:""},
      D: { type: String ,default:""},
      correct_answer: { type: String ,default:""}
    }],

    type: { type: Number },

    group: { type: String ,default:""},

    label: { type: String ,default:""},

    passages: [{
      _id: false,

      number: { type: Number },

      content: { type: String ,default:""},

      image: { type: String ,default:""},
    }],

    transcript: { type: String ,default:""},

    image: { type: String ,default:""},

    audio: { type: String ,default:""}
  }
  , {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length) {
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object
  } = this.toObject({ virtuals: true });
  object.id = _id;

  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const group_question = mongoose.model('group_question', schema);
module.exports = group_question;