/**
 * examRoutes.js
 * @description :: CRUD API routes for exam
 */

const express = require('express');
const router = express.Router();
const examController = require('../../controller/admin/examController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/exam/create').post(auth(PLATFORM.ADMIN),checkRolePermission,examController.addExam);
router.route('/admin/exam/list').post(auth(PLATFORM.ADMIN),checkRolePermission,examController.findAllExam);
router.route('/admin/exam/count').post(auth(PLATFORM.ADMIN),checkRolePermission,examController.getExamCount);
router.route('/admin/exam/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,examController.getExam);
router.route('/admin/exam/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,examController.updateExam);    
router.route('/admin/exam/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,examController.partialUpdateExam);
router.route('/admin/exam/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,examController.softDeleteExam);
router.route('/admin/exam/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,examController.softDeleteManyExam);
router.route('/admin/exam/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,examController.bulkInsertExam);
router.route('/admin/exam/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,examController.bulkUpdateExam);
router.route('/admin/exam/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,examController.deleteExam);
router.route('/admin/exam/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,examController.deleteManyExam);

module.exports = router;
