/**
 * group_questionValidation.js
 * @description :: validate each post and put request as per group_question model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select
} = require('./commonFilterValidation');

/** validation keys and properties of group_question */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  questions: joi.array().items(joi.object()),
  group: joi.string().allow(null).allow(''),
  passage: joi.string().allow(null).allow(''),
  transcript: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  audio: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of group_question for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  questions: joi.array().items(joi.object()),
  group: joi.string().allow(null).allow(''),
  passage: joi.string().allow(null).allow(''),
  transcript: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  audio: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of group_question for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      isActive: joi.alternatives().try(joi.array().items(), joi.boolean(), joi.object()),
      group: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      label: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      type: joi.alternatives().try(joi.array().items(), joi.string(), joi.object(), joi.number()),
      // questions: joi.alternatives().try(joi.array(), joi.string(), joi.object(), joi.number()),
      passage: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      transcript: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      image: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      audio: joi.alternatives().try(joi.array().items(), joi.string(), joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(), joi.string().regex(/^[0-9a-fA-F]{24}$/), joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select

}).unknown(true);
