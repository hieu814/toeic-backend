/**
 * word_topicRoutes.js
 * @description :: CRUD API routes for word_topic
 */

const express = require('express');
const router = express.Router();
const word_topicController = require('../../controller/admin/word_topicController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/word_topic/create').post(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.addWord_topic);
router.route('/admin/word_topic/list').post(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.findAllWord_topic);
router.route('/admin/word_topic/count').post(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.getWord_topicCount);
router.route('/admin/word_topic/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.getWord_topic);
router.route('/admin/word_topic/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.updateWord_topic);    
router.route('/admin/word_topic/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.partialUpdateWord_topic);
router.route('/admin/word_topic/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.softDeleteWord_topic);
router.route('/admin/word_topic/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.softDeleteManyWord_topic);
router.route('/admin/word_topic/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.bulkInsertWord_topic);
router.route('/admin/word_topic/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.bulkUpdateWord_topic);
router.route('/admin/word_topic/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.deleteWord_topic);
router.route('/admin/word_topic/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,word_topicController.deleteManyWord_topic);

module.exports = router;
