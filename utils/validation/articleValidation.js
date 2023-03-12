/**
 * articleValidation.js
 * @description :: validate each post and put request as per article model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of article */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  thumbail: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  content: joi.string().allow(null).allow(''),
  category: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of article for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  thumbail: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  content: joi.string().allow(null).allow(''),
  category: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of article for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      thumbail: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      content: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      category: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
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
