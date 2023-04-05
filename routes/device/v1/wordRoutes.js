/**
 * wordRoutes.js
 * @description :: CRUD API routes for word
 */

const express = require('express');
const router = express.Router();
const wordController = require('../../../controller/device/v1/wordController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/word/create').post(auth(PLATFORM.DEVICE),wordController.addWord);
router.route('/device/api/v1/word/list').post(auth(PLATFORM.DEVICE),wordController.findAllWord);
router.route('/device/api/v1/word/count').post(auth(PLATFORM.DEVICE),wordController.getWordCount);
router.route('/device/api/v1/word/:id').get(auth(PLATFORM.DEVICE),wordController.getWord);
router.route('/device/api/v1/word/update/:id').put(auth(PLATFORM.DEVICE),wordController.updateWord);    
router.route('/device/api/v1/word/partial-update/:id').put(auth(PLATFORM.DEVICE),wordController.partialUpdateWord);
router.route('/device/api/v1/word/softDelete/:id').put(auth(PLATFORM.DEVICE),wordController.softDeleteWord);
router.route('/device/api/v1/word/softDeleteMany').put(auth(PLATFORM.DEVICE),wordController.softDeleteManyWord);
router.route('/device/api/v1/word/addBulk').post(auth(PLATFORM.DEVICE),wordController.bulkInsertWord);
router.route('/device/api/v1/word/updateBulk').put(auth(PLATFORM.DEVICE),wordController.bulkUpdateWord);
router.route('/device/api/v1/word/delete/:id').delete(auth(PLATFORM.DEVICE),wordController.deleteWord);
router.route('/device/api/v1/word/deleteMany').post(auth(PLATFORM.DEVICE),wordController.deleteManyWord);

module.exports = router;
