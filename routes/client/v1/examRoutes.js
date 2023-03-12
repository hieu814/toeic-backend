/**
 * examRoutes.js
 * @description :: CRUD API routes for exam
 */

const express = require('express');
const router = express.Router();
const examController = require('../../../controller/client/v1/examController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/exam/create').post(auth(PLATFORM.CLIENT),checkRolePermission,examController.addExam);
router.route('/client/api/v1/exam/list').post(auth(PLATFORM.CLIENT),checkRolePermission,examController.findAllExam);
router.route('/client/api/v1/exam/count').post(auth(PLATFORM.CLIENT),checkRolePermission,examController.getExamCount);
router.route('/client/api/v1/exam/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,examController.getExam);
router.route('/client/api/v1/exam/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,examController.updateExam);    
router.route('/client/api/v1/exam/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,examController.partialUpdateExam);
router.route('/client/api/v1/exam/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,examController.softDeleteExam);
router.route('/client/api/v1/exam/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,examController.softDeleteManyExam);
router.route('/client/api/v1/exam/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,examController.bulkInsertExam);
router.route('/client/api/v1/exam/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,examController.bulkUpdateExam);
router.route('/client/api/v1/exam/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,examController.deleteExam);
router.route('/client/api/v1/exam/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,examController.deleteManyExam);

module.exports = router;
