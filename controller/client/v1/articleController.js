/**
 * articleController.js
 * @description : exports action methods for article.
 */

const Article = require('../../../model/article');
const articleSchemaKey = require('../../../utils/validation/articleValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Article in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Article. {status, message, data}
 */ 
const addArticle = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      articleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Article(dataToCreate);
    let createdArticle = await dbService.create(Article,dataToCreate);
    return res.success({ data : createdArticle });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Article in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Articles. {status, message, data}
 */
const bulkInsertArticle = async (req,res)=>{
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
    let createdArticles = await dbService.create(Article,dataToCreate);
    createdArticles = { count: createdArticles ? createdArticles.length : 0 };
    return res.success({ data:{ count:createdArticles.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Article from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Article(s). {status, message, data}
 */
const findAllArticle = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      articleSchemaKey.findFilterKeys,
      Article.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Article, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundArticles = await dbService.paginate( Article,query,options);
    if (!foundArticles || !foundArticles.data || !foundArticles.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundArticles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Article from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Article. {status, message, data}
 */
const getArticle = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundArticle = await dbService.findOne(Article,query, options);
    if (!foundArticle){
      return res.recordNotFound();
    }
    return res.success({ data :foundArticle });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Article.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getArticleCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      articleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedArticle = await dbService.count(Article,where);
    return res.success({ data : { count: countedArticle } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Article with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Article.
 * @return {Object} : updated Article. {status, message, data}
 */
const updateArticle = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      articleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedArticle = await dbService.updateOne(Article,query,dataToUpdate);
    if (!updatedArticle){
      return res.recordNotFound();
    }
    return res.success({ data :updatedArticle });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Article with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Articles.
 * @return {Object} : updated Articles. {status, message, data}
 */
const bulkUpdateArticle = async (req,res)=>{
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
    let updatedArticle = await dbService.updateMany(Article,filter,dataToUpdate);
    if (!updatedArticle){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedArticle } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Article with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Article.
 * @return {obj} : updated Article. {status, message, data}
 */
const partialUpdateArticle = async (req,res) => {
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
      articleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedArticle = await dbService.updateOne(Article, query, dataToUpdate);
    if (!updatedArticle) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedArticle });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Article from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Article.
 * @return {Object} : deactivated Article. {status, message, data}
 */
const softDeleteArticle = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedArticle = await dbService.updateOne(Article, query, updateBody);
    if (!updatedArticle){
      return res.recordNotFound();
    }
    return res.success({ data:updatedArticle });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Article from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Article. {status, message, data}
 */
const deleteArticle = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedArticle = await dbService.deleteOne(Article, query);
    if (!deletedArticle){
      return res.recordNotFound();
    }
    return res.success({ data :deletedArticle });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Article in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyArticle = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedArticle = await dbService.deleteMany(Article,query);
    if (!deletedArticle){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedArticle } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Article from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Article.
 * @return {Object} : number of deactivated documents of Article. {status, message, data}
 */
const softDeleteManyArticle = async (req,res) => {
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
    let updatedArticle = await dbService.updateMany(Article,query, updateBody);
    if (!updatedArticle) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedArticle } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addArticle,
  bulkInsertArticle,
  findAllArticle,
  getArticle,
  getArticleCount,
  updateArticle,
  bulkUpdateArticle,
  partialUpdateArticle,
  softDeleteArticle,
  deleteArticle,
  deleteManyArticle,
  softDeleteManyArticle    
};