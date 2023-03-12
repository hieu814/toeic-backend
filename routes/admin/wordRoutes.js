/**
 * wordRoutes.js
 * @description :: CRUD API routes for word
 */

const express = require('express');
const router = express.Router();
const wordController = require('../../controller/admin/wordController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/word/create').post(auth(PLATFORM.ADMIN),checkRolePermission,wordController.addWord);
router.route('/admin/word/list').post(auth(PLATFORM.ADMIN),checkRolePermission,wordController.findAllWord);
router.route('/admin/word/count').post(auth(PLATFORM.ADMIN),checkRolePermission,wordController.getWordCount);
router.route('/admin/word/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,wordController.getWord);
router.route('/admin/word/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wordController.updateWord);    
router.route('/admin/word/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wordController.partialUpdateWord);
router.route('/admin/word/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,wordController.softDeleteWord);
router.route('/admin/word/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,wordController.softDeleteManyWord);
router.route('/admin/word/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,wordController.bulkInsertWord);
router.route('/admin/word/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,wordController.bulkUpdateWord);
router.route('/admin/word/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,wordController.deleteWord);
router.route('/admin/word/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,wordController.deleteManyWord);

module.exports = router;
