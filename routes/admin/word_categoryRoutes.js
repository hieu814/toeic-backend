/**
 * word_categoryRoutes.js
 * @description :: CRUD API routes for word_category
 */

const express = require('express');
const router = express.Router();
const word_categoryController = require('../../controller/admin/word_categoryController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/word_category/create').post(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.addWord_category);
router.route('/admin/word_category/list').post(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.findAllWord_category);
router.route('/admin/word_category/count').post(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.getWord_categoryCount);
router.route('/admin/word_category/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.getWord_category);
router.route('/admin/word_category/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.updateWord_category);    
router.route('/admin/word_category/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.partialUpdateWord_category);
router.route('/admin/word_category/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.softDeleteWord_category);
router.route('/admin/word_category/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.softDeleteManyWord_category);
router.route('/admin/word_category/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.bulkInsertWord_category);
router.route('/admin/word_category/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.bulkUpdateWord_category);
router.route('/admin/word_category/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.deleteWord_category);
router.route('/admin/word_category/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,word_categoryController.deleteManyWord_category);

module.exports = router;
