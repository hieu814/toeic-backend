/**
 * exam_categoryRoutes.js
 * @description :: CRUD API routes for exam_category
 */

const express = require('express');
const router = express.Router();
const exam_categoryController = require('../../../controller/client/v1/exam_categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/exam_category/create').post(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.addExam_category);
router.route('/client/api/v1/exam_category/list').post(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.findAllExam_category);
router.route('/client/api/v1/exam_category/count').post(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.getExam_categoryCount);
router.route('/client/api/v1/exam_category/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.getExam_category);
router.route('/client/api/v1/exam_category/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.updateExam_category);    
router.route('/client/api/v1/exam_category/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.partialUpdateExam_category);
router.route('/client/api/v1/exam_category/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.softDeleteExam_category);
router.route('/client/api/v1/exam_category/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.softDeleteManyExam_category);
router.route('/client/api/v1/exam_category/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.bulkInsertExam_category);
router.route('/client/api/v1/exam_category/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.bulkUpdateExam_category);
router.route('/client/api/v1/exam_category/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.deleteExam_category);
router.route('/client/api/v1/exam_category/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,exam_categoryController.deleteManyExam_category);

module.exports = router;
