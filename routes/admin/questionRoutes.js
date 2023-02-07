/**
 * questionRoutes.js
 * @description :: CRUD API routes for question
 */

const express = require('express');
const router = express.Router();
const questionController = require('../../controller/admin/questionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/question/create').post(auth(PLATFORM.ADMIN),checkRolePermission,questionController.addQuestion);
router.route('/admin/question/list').post(auth(PLATFORM.ADMIN),checkRolePermission,questionController.findAllQuestion);
router.route('/admin/question/count').post(auth(PLATFORM.ADMIN),checkRolePermission,questionController.getQuestionCount);
router.route('/admin/question/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,questionController.getQuestion);
router.route('/admin/question/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,questionController.updateQuestion);    
router.route('/admin/question/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,questionController.partialUpdateQuestion);
router.route('/admin/question/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,questionController.softDeleteQuestion);
router.route('/admin/question/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,questionController.softDeleteManyQuestion);
router.route('/admin/question/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,questionController.bulkInsertQuestion);
router.route('/admin/question/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,questionController.bulkUpdateQuestion);
router.route('/admin/question/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,questionController.deleteQuestion);
router.route('/admin/question/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,questionController.deleteManyQuestion);

module.exports = router;
