/**
 * examRoutes.js
 * @description :: CRUD API routes for exam
 */

const express = require('express');
const router = express.Router();
const examController = require('../../../controller/device/v1/examController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/exam/create').post(auth(PLATFORM.DEVICE),examController.addExam);
router.route('/device/api/v1/exam/list').post(auth(PLATFORM.DEVICE),examController.findAllExam);
router.route('/device/api/v1/exam/count').post(auth(PLATFORM.DEVICE),examController.getExamCount);
router.route('/device/api/v1/exam/:id').get(auth(PLATFORM.DEVICE),examController.getExam);
router.route('/device/api/v1/exam/update/:id').put(auth(PLATFORM.DEVICE),examController.updateExam);    
router.route('/device/api/v1/exam/partial-update/:id').put(auth(PLATFORM.DEVICE),examController.partialUpdateExam);
router.route('/device/api/v1/exam/softDelete/:id').put(auth(PLATFORM.DEVICE),examController.softDeleteExam);
router.route('/device/api/v1/exam/softDeleteMany').put(auth(PLATFORM.DEVICE),examController.softDeleteManyExam);
router.route('/device/api/v1/exam/addBulk').post(auth(PLATFORM.DEVICE),examController.bulkInsertExam);
router.route('/device/api/v1/exam/updateBulk').put(auth(PLATFORM.DEVICE),examController.bulkUpdateExam);
router.route('/device/api/v1/exam/delete/:id').delete(auth(PLATFORM.DEVICE),examController.deleteExam);
router.route('/device/api/v1/exam/deleteMany').post(auth(PLATFORM.DEVICE),examController.deleteManyExam);

module.exports = router;
