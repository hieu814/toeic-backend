/**
 * exam_categoryController.js
 * @description : exports action methods for exam_category.
 */

const Exam_category = require('../../../model/exam_category');
const exam_categorySchemaKey = require('../../../utils/validation/exam_categoryValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Exam_category in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Exam_category. {status, message, data}
 */ 
const addExam_category = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      exam_categorySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Exam_category(dataToCreate);
    let createdExam_category = await dbService.create(Exam_category,dataToCreate);
    return res.success({ data : createdExam_category });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Exam_category in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Exam_categorys. {status, message, data}
 */
const bulkInsertExam_category = async (req,res)=>{
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
    let createdExam_categorys = await dbService.create(Exam_category,dataToCreate);
    createdExam_categorys = { count: createdExam_categorys ? createdExam_categorys.length : 0 };
    return res.success({ data:{ count:createdExam_categorys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Exam_category from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Exam_category(s). {status, message, data}
 */
const findAllExam_category = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      exam_categorySchemaKey.findFilterKeys,
      Exam_category.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Exam_category, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundExam_categorys = await dbService.paginate( Exam_category,query,options);
    if (!foundExam_categorys || !foundExam_categorys.data || !foundExam_categorys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundExam_categorys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Exam_category from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Exam_category. {status, message, data}
 */
const getExam_category = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundExam_category = await dbService.findOne(Exam_category,query, options);
    if (!foundExam_category){
      return res.recordNotFound();
    }
    return res.success({ data :foundExam_category });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Exam_category.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getExam_categoryCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      exam_categorySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedExam_category = await dbService.count(Exam_category,where);
    return res.success({ data : { count: countedExam_category } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Exam_category with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Exam_category.
 * @return {Object} : updated Exam_category. {status, message, data}
 */
const updateExam_category = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      exam_categorySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedExam_category = await dbService.updateOne(Exam_category,query,dataToUpdate);
    if (!updatedExam_category){
      return res.recordNotFound();
    }
    return res.success({ data :updatedExam_category });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Exam_category with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Exam_categorys.
 * @return {Object} : updated Exam_categorys. {status, message, data}
 */
const bulkUpdateExam_category = async (req,res)=>{
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
    let updatedExam_category = await dbService.updateMany(Exam_category,filter,dataToUpdate);
    if (!updatedExam_category){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedExam_category } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Exam_category with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Exam_category.
 * @return {obj} : updated Exam_category. {status, message, data}
 */
const partialUpdateExam_category = async (req,res) => {
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
      exam_categorySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedExam_category = await dbService.updateOne(Exam_category, query, dataToUpdate);
    if (!updatedExam_category) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedExam_category });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Exam_category from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Exam_category.
 * @return {Object} : deactivated Exam_category. {status, message, data}
 */
const softDeleteExam_category = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedExam_category = await dbService.updateOne(Exam_category, query, updateBody);
    if (!updatedExam_category){
      return res.recordNotFound();
    }
    return res.success({ data:updatedExam_category });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Exam_category from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Exam_category. {status, message, data}
 */
const deleteExam_category = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedExam_category = await dbService.deleteOne(Exam_category, query);
    if (!deletedExam_category){
      return res.recordNotFound();
    }
    return res.success({ data :deletedExam_category });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Exam_category in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyExam_category = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedExam_category = await dbService.deleteMany(Exam_category,query);
    if (!deletedExam_category){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedExam_category } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Exam_category from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Exam_category.
 * @return {Object} : number of deactivated documents of Exam_category. {status, message, data}
 */
const softDeleteManyExam_category = async (req,res) => {
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
    let updatedExam_category = await dbService.updateMany(Exam_category,query, updateBody);
    if (!updatedExam_category) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedExam_category } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addExam_category,
  bulkInsertExam_category,
  findAllExam_category,
  getExam_category,
  getExam_categoryCount,
  updateExam_category,
  bulkUpdateExam_category,
  partialUpdateExam_category,
  softDeleteExam_category,
  deleteExam_category,
  deleteManyExam_category,
  softDeleteManyExam_category    
};