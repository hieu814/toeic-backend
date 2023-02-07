/**
 * questionRoutes.js
 * @description :: CRUD API routes for question
 */

const express = require('express');
const router = express.Router();
const questionController = require('../../../controller/device/v1/questionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/question/create').post(auth(PLATFORM.DEVICE),checkRolePermission,questionController.addQuestion);
router.route('/device/api/v1/question/list').post(auth(PLATFORM.DEVICE),checkRolePermission,questionController.findAllQuestion);
router.route('/device/api/v1/question/count').post(auth(PLATFORM.DEVICE),checkRolePermission,questionController.getQuestionCount);
router.route('/device/api/v1/question/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,questionController.getQuestion);
router.route('/device/api/v1/question/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,questionController.updateQuestion);    
router.route('/device/api/v1/question/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,questionController.partialUpdateQuestion);
router.route('/device/api/v1/question/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,questionController.softDeleteQuestion);
router.route('/device/api/v1/question/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,questionController.softDeleteManyQuestion);
router.route('/device/api/v1/question/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,questionController.bulkInsertQuestion);
router.route('/device/api/v1/question/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,questionController.bulkUpdateQuestion);
router.route('/device/api/v1/question/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,questionController.deleteQuestion);
router.route('/device/api/v1/question/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,questionController.deleteManyQuestion);

module.exports = router;
