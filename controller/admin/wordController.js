/**
 * wordController.js
 * @description : exports action methods for word.
 */

const Word = require('../../model/word');
const wordSchemaKey = require('../../utils/validation/wordValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');

/**
 * @description : create document of Word in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Word. {status, message, data}
 */
const addWord = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      wordSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Word(dataToCreate);
    let createdWord = await dbService.create(Word, dataToCreate);
    return res.success({ data: createdWord });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : create multiple documents of Word in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Words. {status, message, data}
 */
const bulkInsertWord = async (req, res) => {
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
    // console.log(dataToCreate);
    let createdWords = await dbService.createOrUpdate(Word, dataToCreate, { filter: "name" });
    return res.success({
      data: createdWords || [],
      count: createdWords.length
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find all documents of Word from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Word(s). {status, message, data}
 */
const findAllWord = async (req, res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      wordSchemaKey.findFilterKeys,
      Word.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly) {
      let totalRecords = await dbService.count(Word, query);
      console.log("get all word length ", totalRecords.length);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundWords = await dbService.paginate(Word, query, options);
    if (!foundWords || !foundWords.data || !foundWords.data.length) {
      return res.recordNotFound();
    }
    return res.success({ data: foundWords });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : find document of Word from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Word. {status, message, data}
 */
const getWord = async (req, res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message: 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundWord = await dbService.findOne(Word, query, options);
    if (!foundWord) {
      return res.recordNotFound();
    }
    return res.success({ data: foundWord });
  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : returns total number of documents of Word.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getWordCount = async (req, res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      wordSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedWord = await dbService.count(Word, where);
    return res.success({ data: { count: countedWord } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update document of Word with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Word.
 * @return {Object} : updated Word. {status, message, data}
 */
const updateWord = async (req, res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy: req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      wordSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id: req.params.id };
    console.log(dataToUpdate);
    let updatedWord = await dbService.updateOne(Word, query, dataToUpdate);
    if (!updatedWord) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedWord });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : update multiple records of Word with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Words.
 * @return {Object} : updated Words. {status, message, data}
 */
const bulkUpdateWord = async (req, res) => {
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
    let updatedWord = await dbService.updateMany(Word, filter, dataToUpdate);
    if (!updatedWord) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedWord } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : partially update document of Word with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Word.
 * @return {obj} : updated Word. {status, message, data}
 */
const partialUpdateWord = async (req, res) => {
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
      wordSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id: req.params.id };
    let updatedWord = await dbService.updateOne(Word, query, dataToUpdate);
    if (!updatedWord) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedWord });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : deactivate document of Word from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Word.
 * @return {Object} : deactivated Word. {status, message, data}
 */
const softDeleteWord = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    let query = { _id: req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedWord = await dbService.updateOne(Word, query, updateBody);
    if (!updatedWord) {
      return res.recordNotFound();
    }
    return res.success({ data: updatedWord });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete document of Word from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Word. {status, message, data}
 */
const deleteWord = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    const query = { _id: req.params.id };
    const deletedWord = await dbService.deleteOne(Word, query);
    if (!deletedWord) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedWord });

  }
  catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

/**
 * @description : delete documents of Word in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyWord = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id: { $in: ids } };
    const deletedWord = await dbService.deleteMany(Word, query);
    if (!deletedWord) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: deletedWord } });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};
/**
 * @description : deactivate multiple documents of Word from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Word.
 * @return {Object} : number of deactivated documents of Word. {status, message, data}
 */
const softDeleteManyWord = async (req, res) => {
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
    let updatedWord = await dbService.updateMany(Word, query, updateBody);
    if (!updatedWord) {
      return res.recordNotFound();
    }
    return res.success({ data: { count: updatedWord } });

  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

module.exports = {
  addWord,
  bulkInsertWord,
  findAllWord,
  getWord,
  getWordCount,
  updateWord,
  bulkUpdateWord,
  partialUpdateWord,
  softDeleteWord,
  deleteWord,
  deleteManyWord,
  softDeleteManyWord
};