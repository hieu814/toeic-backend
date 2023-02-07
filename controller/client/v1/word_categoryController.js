/**
 * word_categoryController.js
 * @description : exports action methods for word_category.
 */

const Word_category = require('../../../model/word_category');
const word_categorySchemaKey = require('../../../utils/validation/word_categoryValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Word_category in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Word_category. {status, message, data}
 */ 
const addWord_category = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      word_categorySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Word_category(dataToCreate);
    let createdWord_category = await dbService.create(Word_category,dataToCreate);
    return res.success({ data : createdWord_category });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Word_category in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Word_categorys. {status, message, data}
 */
const bulkInsertWord_category = async (req,res)=>{
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
    let createdWord_categorys = await dbService.create(Word_category,dataToCreate);
    createdWord_categorys = { count: createdWord_categorys ? createdWord_categorys.length : 0 };
    return res.success({ data:{ count:createdWord_categorys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Word_category from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Word_category(s). {status, message, data}
 */
const findAllWord_category = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      word_categorySchemaKey.findFilterKeys,
      Word_category.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Word_category, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundWord_categorys = await dbService.paginate( Word_category,query,options);
    if (!foundWord_categorys || !foundWord_categorys.data || !foundWord_categorys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundWord_categorys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Word_category from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Word_category. {status, message, data}
 */
const getWord_category = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundWord_category = await dbService.findOne(Word_category,query, options);
    if (!foundWord_category){
      return res.recordNotFound();
    }
    return res.success({ data :foundWord_category });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Word_category.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getWord_categoryCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      word_categorySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedWord_category = await dbService.count(Word_category,where);
    return res.success({ data : { count: countedWord_category } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Word_category with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Word_category.
 * @return {Object} : updated Word_category. {status, message, data}
 */
const updateWord_category = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      word_categorySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedWord_category = await dbService.updateOne(Word_category,query,dataToUpdate);
    if (!updatedWord_category){
      return res.recordNotFound();
    }
    return res.success({ data :updatedWord_category });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Word_category with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Word_categorys.
 * @return {Object} : updated Word_categorys. {status, message, data}
 */
const bulkUpdateWord_category = async (req,res)=>{
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
    let updatedWord_category = await dbService.updateMany(Word_category,filter,dataToUpdate);
    if (!updatedWord_category){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedWord_category } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Word_category with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Word_category.
 * @return {obj} : updated Word_category. {status, message, data}
 */
const partialUpdateWord_category = async (req,res) => {
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
      word_categorySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedWord_category = await dbService.updateOne(Word_category, query, dataToUpdate);
    if (!updatedWord_category) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedWord_category });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Word_category from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Word_category.
 * @return {Object} : deactivated Word_category. {status, message, data}
 */
const softDeleteWord_category = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedWord_category = await dbService.updateOne(Word_category, query, updateBody);
    if (!updatedWord_category){
      return res.recordNotFound();
    }
    return res.success({ data:updatedWord_category });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Word_category from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Word_category. {status, message, data}
 */
const deleteWord_category = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedWord_category = await dbService.deleteOne(Word_category, query);
    if (!deletedWord_category){
      return res.recordNotFound();
    }
    return res.success({ data :deletedWord_category });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Word_category in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyWord_category = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedWord_category = await dbService.deleteMany(Word_category,query);
    if (!deletedWord_category){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedWord_category } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Word_category from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Word_category.
 * @return {Object} : number of deactivated documents of Word_category. {status, message, data}
 */
const softDeleteManyWord_category = async (req,res) => {
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
    let updatedWord_category = await dbService.updateMany(Word_category,query, updateBody);
    if (!updatedWord_category) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedWord_category } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addWord_category,
  bulkInsertWord_category,
  findAllWord_category,
  getWord_category,
  getWord_categoryCount,
  updateWord_category,
  bulkUpdateWord_category,
  partialUpdateWord_category,
  softDeleteWord_category,
  deleteWord_category,
  deleteManyWord_category,
  softDeleteManyWord_category    
};