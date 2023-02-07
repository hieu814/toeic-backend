/**
 * questionValidation.js
 * @description :: validate each post and put request as per question model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of question */
exports.schemaKeys = joi.object({
  number: joi.string().allow(null).allow(''),
  question: joi.string().allow(null).allow(''),
  A: joi.string().allow(null).allow(''),
  B: joi.string().allow(null).allow(''),
  C: joi.string().allow(null).allow(''),
  D: joi.string().allow(null).allow(''),
  correct_answer: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of question for updation */
exports.updateSchemaKeys = joi.object({
  number: joi.string().allow(null).allow(''),
  question: joi.string().allow(null).allow(''),
  A: joi.string().allow(null).allow(''),
  B: joi.string().allow(null).allow(''),
  C: joi.string().allow(null).allow(''),
  D: joi.string().allow(null).allow(''),
  correct_answer: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of question for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      question: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      A: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      B: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      C: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      D: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      correct_answer: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
