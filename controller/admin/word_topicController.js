/**
 * word_topicController.js
 * @description : exports action methods for word_topic.
 */

const Word_topic = require('../../model/word_topic');
const word_topicSchemaKey = require('../../utils/validation/word_topicValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');

/**
 * @description : create document of Word_topic in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Word_topic. {status, message, data}
 */
const addWord_topic = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      word_topicSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Word_topic(dataToCreate);
    let createdWord_topic = await dbService.create(Word_topic, dataToCreate);
    return res.success({ data: createdWord_topic });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : create multiple documents of Word_topic in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Word_topics. {status, message, data}
 */
const bulkInsertWord_topic = async (req, res) => {
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [...req.body.data];
    for (let i = 0; i < dataToCreate.length; i++) {
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdWord_topics = await dbService.create(Word_topic, dataToCreate);
    createdWord_topics = { count: createdWord_topics ? createdWord_topics.length : 0 };
    return res.success({ data: { count: createdWord_topics.count || 0 } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find all documents of Word_topic from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Word_topic(s). {status, message, data}
 */
const findAllWord_topic = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      word_topicSchemaKey.findFilterKeys,
      Word_topic.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly) {
      let totalRecords = await dbService.count(Word_topic, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundWord_topics = await dbService.paginate(Word_topic, query, options);
    console.log({ foundWord_topics: JSON.stringify(foundWord_topics) });
    if (!foundWord_topics || !foundWord_topics.data || !foundWord_topics.data.length) {
      return res.recordNotFound();
    }
    return res.success({ data: foundWord_topics });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find document of Word_topic from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Word_topic. {status, message, data}
 */
const getWord_topic = async (req, res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message: 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundWord_topic = await dbService.findOne(Word_topic, query, options);
    if (!foundWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: foundWord_topic });
  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : returns total number of documents of Word_topic.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getWord_topicCount = async (req, res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      word_topicSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedWord_topic = await dbService.count(Word_topic, where);
    return res.success({ data: { count: countedWord_topic } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update document of Word_topic with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Word_topic.
 * @return {Object} : updated Word_topic. {status, message, data}
 */
const updateWord_topic = async (req, res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy: req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      word_topicSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id: req.params.id };
    let updatedWord_topic = await dbService.updateOne(Word_topic, query, dataToUpdate);
    if (!updatedWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedWord_topic });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update multiple records of Word_topic with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Word_topics.
 * @return {Object} : updated Word_topics. {status, message, data}
 */
const bulkUpdateWord_topic = async (req, res) => {
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy: req.user.id
      };
    }
    let updatedWord_topic = await dbService.updateMany(Word_topic, filter, dataToUpdate);
    if (!updatedWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedWord_topic } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : partially update document of Word_topic with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Word_topic.
 * @return {obj} : updated Word_topic. {status, message, data}
 */
const partialUpdateWord_topic = async (req, res) => {
  try {
    if (!req.params.id) {
      res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy: req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      word_topicSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id: req.params.id };
    let updatedWord_topic = await dbService.updateOne(Word_topic, query, dataToUpdate);
    if (!updatedWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedWord_topic });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : deactivate document of Word_topic from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Word_topic.
 * @return {Object} : deactivated Word_topic. {status, message, data}
 */
const softDeleteWord_topic = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    let query = { _id: req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedWord_topic = await dbService.updateOne(Word_topic, query, updateBody);
    if (!updatedWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedWord_topic });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete document of Word_topic from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Word_topic. {status, message, data}
 */
const deleteWord_topic = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    const query = { _id: req.params.id };
    const deletedWord_topic = await dbService.deleteOne(Word_topic, query);
    if (!deletedWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedWord_topic });

  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete documents of Word_topic in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyWord_topic = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const deletedWord_topic = await dbService.deleteMany(Word_topic, query);
    if (!deletedWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: deletedWord_topic } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : deactivate multiple documents of Word_topic from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Word_topic.
 * @return {Object} : number of deactivated documents of Word_topic. {status, message, data}
 */
const softDeleteManyWord_topic = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedWord_topic = await dbService.updateMany(Word_topic, query, updateBody);
    if (!updatedWord_topic) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedWord_topic } });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  addWord_topic,
  bulkInsertWord_topic,
  findAllWord_topic,
  getWord_topic,
  getWord_topicCount,
  updateWord_topic,
  bulkUpdateWord_topic,
  partialUpdateWord_topic,
  softDeleteWord_topic,
  deleteWord_topic,
  deleteManyWord_topic,
  softDeleteManyWord_topic
};