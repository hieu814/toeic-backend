/**
 * exam_categoryRoutes.js
 * @description :: CRUD API routes for exam_category
 */

const express = require('express');
const router = express.Router();
const exam_categoryController = require('../../../controller/device/v1/exam_categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/exam_category/create').post(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.addExam_category);
router.route('/device/api/v1/exam_category/list').post(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.findAllExam_category);
router.route('/device/api/v1/exam_category/count').post(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.getExam_categoryCount);
router.route('/device/api/v1/exam_category/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.getExam_category);
router.route('/device/api/v1/exam_category/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.updateExam_category);    
router.route('/device/api/v1/exam_category/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.partialUpdateExam_category);
router.route('/device/api/v1/exam_category/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.softDeleteExam_category);
router.route('/device/api/v1/exam_category/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.softDeleteManyExam_category);
router.route('/device/api/v1/exam_category/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.bulkInsertExam_category);
router.route('/device/api/v1/exam_category/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.bulkUpdateExam_category);
router.route('/device/api/v1/exam_category/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.deleteExam_category);
router.route('/device/api/v1/exam_category/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,exam_categoryController.deleteManyExam_category);

module.exports = router;
