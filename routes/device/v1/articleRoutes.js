/**
 * articleRoutes.js
 * @description :: CRUD API routes for article
 */

const express = require('express');
const router = express.Router();
const articleController = require('../../../controller/device/v1/articleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/article/create').post(auth(PLATFORM.DEVICE),checkRolePermission,articleController.addArticle);
router.route('/device/api/v1/article/list').post(auth(PLATFORM.DEVICE),checkRolePermission,articleController.findAllArticle);
router.route('/device/api/v1/article/count').post(auth(PLATFORM.DEVICE),checkRolePermission,articleController.getArticleCount);
router.route('/device/api/v1/article/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,articleController.getArticle);
router.route('/device/api/v1/article/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,articleController.updateArticle);    
router.route('/device/api/v1/article/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,articleController.partialUpdateArticle);
router.route('/device/api/v1/article/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,articleController.softDeleteArticle);
router.route('/device/api/v1/article/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,articleController.softDeleteManyArticle);
router.route('/device/api/v1/article/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,articleController.bulkInsertArticle);
router.route('/device/api/v1/article/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,articleController.bulkUpdateArticle);
router.route('/device/api/v1/article/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,articleController.deleteArticle);
router.route('/device/api/v1/article/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,articleController.deleteManyArticle);

module.exports = router;
