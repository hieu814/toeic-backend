/**
 * word_categoryRoutes.js
 * @description :: CRUD API routes for word_category
 */

const express = require('express');
const router = express.Router();
const word_categoryController = require('../../../controller/device/v1/word_categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/word_category/create').post(auth(PLATFORM.DEVICE),word_categoryController.addWord_category);
router.route('/device/api/v1/word_category/list').post(auth(PLATFORM.DEVICE),word_categoryController.findAllWord_category);
router.route('/device/api/v1/word_category/count').post(auth(PLATFORM.DEVICE),word_categoryController.getWord_categoryCount);
router.route('/device/api/v1/word_category/:id').get(auth(PLATFORM.DEVICE),word_categoryController.getWord_category);
router.route('/device/api/v1/word_category/update/:id').put(auth(PLATFORM.DEVICE),word_categoryController.updateWord_category);    
router.route('/device/api/v1/word_category/partial-update/:id').put(auth(PLATFORM.DEVICE),word_categoryController.partialUpdateWord_category);
router.route('/device/api/v1/word_category/softDelete/:id').put(auth(PLATFORM.DEVICE),word_categoryController.softDeleteWord_category);
router.route('/device/api/v1/word_category/softDeleteMany').put(auth(PLATFORM.DEVICE),word_categoryController.softDeleteManyWord_category);
router.route('/device/api/v1/word_category/addBulk').post(auth(PLATFORM.DEVICE),word_categoryController.bulkInsertWord_category);
router.route('/device/api/v1/word_category/updateBulk').put(auth(PLATFORM.DEVICE),word_categoryController.bulkUpdateWord_category);
router.route('/device/api/v1/word_category/delete/:id').delete(auth(PLATFORM.DEVICE),word_categoryController.deleteWord_category);
router.route('/device/api/v1/word_category/deleteMany').post(auth(PLATFORM.DEVICE),word_categoryController.deleteManyWord_category);

module.exports = router;
