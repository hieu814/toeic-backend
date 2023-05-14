/**
 * word_topicRoutes.js
 * @description :: CRUD API routes for word_topic
 */

const express = require('express');
const router = express.Router();
const word_topicController = require('../../../controller/device/v1/word_topicController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/word_topic/create').post(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.addWord_topic);
router.route('/device/api/v1/word_topic/list').post(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.findAllWord_topic);
router.route('/device/api/v1/word_topic/count').post(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.getWord_topicCount);
router.route('/device/api/v1/word_topic/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.getWord_topic);
router.route('/device/api/v1/word_topic/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.updateWord_topic);    
router.route('/device/api/v1/word_topic/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.partialUpdateWord_topic);
router.route('/device/api/v1/word_topic/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.softDeleteWord_topic);
router.route('/device/api/v1/word_topic/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.softDeleteManyWord_topic);
router.route('/device/api/v1/word_topic/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.bulkInsertWord_topic);
router.route('/device/api/v1/word_topic/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.bulkUpdateWord_topic);
router.route('/device/api/v1/word_topic/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.deleteWord_topic);
router.route('/device/api/v1/word_topic/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,word_topicController.deleteManyWord_topic);

module.exports = router;
