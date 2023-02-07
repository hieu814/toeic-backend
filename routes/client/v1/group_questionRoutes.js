/**
 * group_questionRoutes.js
 * @description :: CRUD API routes for group_question
 */

const express = require('express');
const router = express.Router();
const group_questionController = require('../../../controller/client/v1/group_questionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/group_question/create').post(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.addGroup_question);
router.route('/client/api/v1/group_question/list').post(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.findAllGroup_question);
router.route('/client/api/v1/group_question/count').post(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.getGroup_questionCount);
router.route('/client/api/v1/group_question/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.getGroup_question);
router.route('/client/api/v1/group_question/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.updateGroup_question);    
router.route('/client/api/v1/group_question/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.partialUpdateGroup_question);
router.route('/client/api/v1/group_question/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.softDeleteGroup_question);
router.route('/client/api/v1/group_question/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.softDeleteManyGroup_question);
router.route('/client/api/v1/group_question/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.bulkInsertGroup_question);
router.route('/client/api/v1/group_question/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.bulkUpdateGroup_question);
router.route('/client/api/v1/group_question/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.deleteGroup_question);
router.route('/client/api/v1/group_question/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,group_questionController.deleteManyGroup_question);

module.exports = router;
