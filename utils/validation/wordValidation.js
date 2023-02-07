/**
 * wordValidation.js
 * @description :: validate each post and put request as per word model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of word */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  mean: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  sound: joi.string().allow(null).allow(''),
  definition: joi.string().allow(null).allow(''),
  example: joi.string().allow(null).allow(''),
  pronounce: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of word for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  mean: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  sound: joi.string().allow(null).allow(''),
  definition: joi.string().allow(null).allow(''),
  example: joi.string().allow(null).allow(''),
  pronounce: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of word for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mean: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      sound: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      definition: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      example: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      pronounce: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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
