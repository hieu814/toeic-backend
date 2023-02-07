/**
 * examController.js
 * @description : exports action methods for exam.
 */

const Exam = require('../../model/exam');
const examSchemaKey = require('../../utils/validation/examValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Exam in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Exam. {status, message, data}
 */ 
const addExam = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      examSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Exam(dataToCreate);
    let createdExam = await dbService.create(Exam,dataToCreate);
    return res.success({ data : createdExam });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Exam in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Exams. {status, message, data}
 */
const bulkInsertExam = async (req,res)=>{
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
    let createdExams = await dbService.create(Exam,dataToCreate);
    createdExams = { count: createdExams ? createdExams.length : 0 };
    return res.success({ data:{ count:createdExams.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Exam from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Exam(s). {status, message, data}
 */
const findAllExam = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      examSchemaKey.findFilterKeys,
      Exam.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Exam, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundExams = await dbService.paginate( Exam,query,options);
    if (!foundExams || !foundExams.data || !foundExams.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundExams });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Exam from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Exam. {status, message, data}
 */
const getExam = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundExam = await dbService.findOne(Exam,query, options);
    if (!foundExam){
      return res.recordNotFound();
    }
    return res.success({ data :foundExam });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Exam.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getExamCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      examSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedExam = await dbService.count(Exam,where);
    return res.success({ data : { count: countedExam } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Exam with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Exam.
 * @return {Object} : updated Exam. {status, message, data}
 */
const updateExam = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      examSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedExam = await dbService.updateOne(Exam,query,dataToUpdate);
    if (!updatedExam){
      return res.recordNotFound();
    }
    return res.success({ data :updatedExam });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Exam with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Exams.
 * @return {Object} : updated Exams. {status, message, data}
 */
const bulkUpdateExam = async (req,res)=>{
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
    let updatedExam = await dbService.updateMany(Exam,filter,dataToUpdate);
    if (!updatedExam){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedExam } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Exam with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Exam.
 * @return {obj} : updated Exam. {status, message, data}
 */
const partialUpdateExam = async (req,res) => {
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
      examSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedExam = await dbService.updateOne(Exam, query, dataToUpdate);
    if (!updatedExam) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedExam });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Exam from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Exam.
 * @return {Object} : deactivated Exam. {status, message, data}
 */
const softDeleteExam = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedExam = await dbService.updateOne(Exam, query, updateBody);
    if (!updatedExam){
      return res.recordNotFound();
    }
    return res.success({ data:updatedExam });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Exam from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Exam. {status, message, data}
 */
const deleteExam = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedExam = await dbService.deleteOne(Exam, query);
    if (!deletedExam){
      return res.recordNotFound();
    }
    return res.success({ data :deletedExam });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Exam in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyExam = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedExam = await dbService.deleteMany(Exam,query);
    if (!deletedExam){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedExam } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Exam from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Exam.
 * @return {Object} : number of deactivated documents of Exam. {status, message, data}
 */
const softDeleteManyExam = async (req,res) => {
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
    let updatedExam = await dbService.updateMany(Exam,query, updateBody);
    if (!updatedExam) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedExam } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addExam,
  bulkInsertExam,
  findAllExam,
  getExam,
  getExamCount,
  updateExam,
  bulkUpdateExam,
  partialUpdateExam,
  softDeleteExam,
  deleteExam,
  deleteManyExam,
  softDeleteManyExam    
};