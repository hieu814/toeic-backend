/**
 * resultValidation.js
 * @description :: validate each post and put request as per result model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of result */
exports.schemaKeys = joi.object({
  user: joi.string().allow(null).allow(''),
  exam: joi.string().allow(null).allow(''),
  answers: joi.any(),
  score: joi.object({
    reading:joi.string(),
    listening:joi.string()
  }),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of result for updation */
exports.updateSchemaKeys = joi.object({
  user: joi.string().allow(null).allow(''),
  exam: joi.string().allow(null).allow(''),
  answers: joi.any(),
  score: joi.object({
    reading:joi.string(),
    listening:joi.string()
  }),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of result for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      user: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      exam: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      answers: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      score: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
