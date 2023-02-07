/**
 * articleRoutes.js
 * @description :: CRUD API routes for article
 */

const express = require('express');
const router = express.Router();
const articleController = require('../../../controller/client/v1/articleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/article/create').post(auth(PLATFORM.CLIENT),checkRolePermission,articleController.addArticle);
router.route('/client/api/v1/article/list').post(auth(PLATFORM.CLIENT),checkRolePermission,articleController.findAllArticle);
router.route('/client/api/v1/article/count').post(auth(PLATFORM.CLIENT),checkRolePermission,articleController.getArticleCount);
router.route('/client/api/v1/article/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,articleController.getArticle);
router.route('/client/api/v1/article/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,articleController.updateArticle);    
router.route('/client/api/v1/article/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,articleController.partialUpdateArticle);
router.route('/client/api/v1/article/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,articleController.softDeleteArticle);
router.route('/client/api/v1/article/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,articleController.softDeleteManyArticle);
router.route('/client/api/v1/article/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,articleController.bulkInsertArticle);
router.route('/client/api/v1/article/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,articleController.bulkUpdateArticle);
router.route('/client/api/v1/article/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,articleController.deleteArticle);
router.route('/client/api/v1/article/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,articleController.deleteManyArticle);

module.exports = router;
