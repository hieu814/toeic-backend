/**
 * group_questionController.js
 * @description : exports action methods for group_question.
 */

const Group_question = require('../../model/group_question');
const group_questionSchemaKey = require('../../utils/validation/group_questionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');

/**
 * @description : create document of Group_question in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Group_question. {status, message, data}
 */
const addGroup_question = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      group_questionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Group_question(dataToCreate);
    let createdGroup_question = await dbService.create(Group_question, dataToCreate);
    return res.success({ data: createdGroup_question });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : create multiple documents of Group_question in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Group_questions. {status, message, data}
 */
const bulkInsertGroup_question = async (req, res) => {
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
    let createdGroup_questions = await dbService.create(Group_question, dataToCreate);
    // createdGroup_questions = { count: createdGroup_questions ? createdGroup_questions.length : 0, };
    let ids = Array.from((createdGroup_questions || []), (field) => {
      return field.id
    })
    return res.success({
      data: ids || []
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find all documents of Group_question from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Group_question(s). {status, message, data}
 */
const findAllGroup_question = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      group_questionSchemaKey.findFilterKeys,
      Group_question.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
      if (query['exam']) {
        query.exam = ObjectId(query['exam'])
      } else {
        delete query['exam']
      }
    }
    if (req.body.isCountOnly) {
      let totalRecords = await dbService.count(Group_question, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundGroup_questions = await dbService.paginate(Group_question, query, options);
    if (!foundGroup_questions || !foundGroup_questions.data || !foundGroup_questions.data.length) {
      return res.recordNotFound();
    }
    return res.success({ data: foundGroup_questions });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find document of Group_question from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Group_question. {status, message, data}
 */
const getGroup_question = async (req, res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message: 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundGroup_question = await dbService.findOne(Group_question, query, options);
    if (!foundGroup_question) {
      return res.recordNotFound();
    }
    return res.success({ data: foundGroup_question });
  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : returns total number of documents of Group_question.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getGroup_questionCount = async (req, res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      group_questionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedGroup_question = await dbService.count(Group_question, where);
    return res.success({ data: { count: countedGroup_question } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update document of Group_question with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Group_question.
 * @return {Object} : updated Group_question. {status, message, data}
 */
const updateGroup_question = async (req, res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy: req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      group_questionSchemaKey.updateSchemaKeys
    );
    console.log({ requestBody: req.body });
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id: req.params.id };
    let updatedGroup_question = await dbService.updateOne(Group_question, query, dataToUpdate);
    if (!updatedGroup_question) {
      return res.recordNotFound();
    }
    console.log({ updatedGroup_question });
    return res.success({ data: updatedGroup_question });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update multiple records of Group_question with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Group_questions.
 * @return {Object} : updated Group_questions. {status, message, data}
 */
const bulkUpdateGroup_question = async (req, res) => {
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
    let updatedGroup_question = await dbService.updateMany(Group_question, filter, dataToUpdate);
    if (!updatedGroup_question) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedGroup_question } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : partially update document of Group_question with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Group_question.
 * @return {obj} : updated Group_question. {status, message, data}
 */
const partialUpdateGroup_question = async (req, res) => {
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
      group_questionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id: req.params.id };
    let updatedGroup_question = await dbService.updateOne(Group_question, query, dataToUpdate);
    if (!updatedGroup_question) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedGroup_question });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : deactivate document of Group_question from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Group_question.
 * @return {Object} : deactivated Group_question. {status, message, data}
 */
const softDeleteGroup_question = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    let query = { _id: req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedGroup_question = await dbService.updateOne(Group_question, query, updateBody);
    if (!updatedGroup_question) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedGroup_question });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete document of Group_question from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Group_question. {status, message, data}
 */
const deleteGroup_question = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    const query = { _id: req.params.id };
    const deletedGroup_question = await dbService.deleteOne(Group_question, query);
    if (!deletedGroup_question) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedGroup_question });

  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete documents of Group_question in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyGroup_question = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const deletedGroup_question = await dbService.deleteMany(Group_question, query);
    if (!deletedGroup_question) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: deletedGroup_question } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : deactivate multiple documents of Group_question from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Group_question.
 * @return {Object} : number of deactivated documents of Group_question. {status, message, data}
 */
const softDeleteManyGroup_question = async (req, res) => {
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
    let updatedGroup_question = await dbService.updateMany(Group_question, query, updateBody);
    if (!updatedGroup_question) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedGroup_question } });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  addGroup_question,
  bulkInsertGroup_question,
  findAllGroup_question,
  getGroup_question,
  getGroup_questionCount,
  updateGroup_question,
  bulkUpdateGroup_question,
  partialUpdateGroup_question,
  softDeleteGroup_question,
  deleteGroup_question,
  deleteManyGroup_question,
  softDeleteManyGroup_question
};