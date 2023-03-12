/**
 * wordRoutes.js
 * @description :: CRUD API routes for word
 */

const express = require('express');
const router = express.Router();
const wordController = require('../../../controller/client/v1/wordController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/word/create').post(auth(PLATFORM.CLIENT),checkRolePermission,wordController.addWord);
router.route('/client/api/v1/word/list').post(auth(PLATFORM.CLIENT),checkRolePermission,wordController.findAllWord);
router.route('/client/api/v1/word/count').post(auth(PLATFORM.CLIENT),checkRolePermission,wordController.getWordCount);
router.route('/client/api/v1/word/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,wordController.getWord);
router.route('/client/api/v1/word/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,wordController.updateWord);    
router.route('/client/api/v1/word/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,wordController.partialUpdateWord);
router.route('/client/api/v1/word/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,wordController.softDeleteWord);
router.route('/client/api/v1/word/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,wordController.softDeleteManyWord);
router.route('/client/api/v1/word/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,wordController.bulkInsertWord);
router.route('/client/api/v1/word/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,wordController.bulkUpdateWord);
router.route('/client/api/v1/word/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,wordController.deleteWord);
router.route('/client/api/v1/word/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,wordController.deleteManyWord);

module.exports = router;
