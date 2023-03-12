/**
 * resultController.js
 * @description : exports action methods for result.
 */

const Result = require('../../model/result');
const resultSchemaKey = require('../../utils/validation/resultValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Result in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Result. {status, message, data}
 */ 
const addResult = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      resultSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Result(dataToCreate);
    let createdResult = await dbService.create(Result,dataToCreate);
    return res.success({ data : createdResult });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Result in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Results. {status, message, data}
 */
const bulkInsertResult = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdResults = await dbService.create(Result,dataToCreate);
    createdResults = { count: createdResults ? createdResults.length : 0 };
    return res.success({ data:{ count:createdResults.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Result from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Result(s). {status, message, data}
 */
const findAllResult = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      resultSchemaKey.findFilterKeys,
      Result.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Result, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundResults = await dbService.paginate( Result,query,options);
    if (!foundResults || !foundResults.data || !foundResults.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundResults });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Result from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Result. {status, message, data}
 */
const getResult = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundResult = await dbService.findOne(Result,query, options);
    if (!foundResult){
      return res.recordNotFound();
    }
    return res.success({ data :foundResult });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Result.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getResultCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      resultSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedResult = await dbService.count(Result,where);
    return res.success({ data : { count: countedResult } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Result with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Result.
 * @return {Object} : updated Result. {status, message, data}
 */
const updateResult = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      resultSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedResult = await dbService.updateOne(Result,query,dataToUpdate);
    if (!updatedResult){
      return res.recordNotFound();
    }
    return res.success({ data :updatedResult });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Result with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Results.
 * @return {Object} : updated Results. {status, message, data}
 */
const bulkUpdateResult = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedResult = await dbService.updateMany(Result,filter,dataToUpdate);
    if (!updatedResult){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedResult } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Result with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Result.
 * @return {obj} : updated Result. {status, message, data}
 */
const partialUpdateResult = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      resultSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedResult = await dbService.updateOne(Result, query, dataToUpdate);
    if (!updatedResult) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedResult });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Result from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Result.
 * @return {Object} : deactivated Result. {status, message, data}
 */
const softDeleteResult = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedResult = await dbService.updateOne(Result, query, updateBody);
    if (!updatedResult){
      return res.recordNotFound();
    }
    return res.success({ data:updatedResult });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Result from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Result. {status, message, data}
 */
const deleteResult = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedResult = await dbService.deleteOne(Result, query);
    if (!deletedResult){
      return res.recordNotFound();
    }
    return res.success({ data :deletedResult });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Result in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyResult = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedResult = await dbService.deleteMany(Result,query);
    if (!deletedResult){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedResult } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Result from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Result.
 * @return {Object} : number of deactivated documents of Result. {status, message, data}
 */
const softDeleteManyResult = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedResult = await dbService.updateMany(Result,query, updateBody);
    if (!updatedResult) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedResult } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addResult,
  bulkInsertResult,
  findAllResult,
  getResult,
  getResultCount,
  updateResult,
  bulkUpdateResult,
  partialUpdateResult,
  softDeleteResult,
  deleteResult,
  deleteManyResult,
  softDeleteManyResult    
};