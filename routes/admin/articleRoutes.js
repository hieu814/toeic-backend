/**
 * articleRoutes.js
 * @description :: CRUD API routes for article
 */

const express = require('express');
const router = express.Router();
const articleController = require('../../controller/admin/articleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/article/create').post(auth(PLATFORM.ADMIN),checkRolePermission,articleController.addArticle);
router.route('/admin/article/list').post(auth(PLATFORM.ADMIN),checkRolePermission,articleController.findAllArticle);
router.route('/admin/article/count').post(auth(PLATFORM.ADMIN),checkRolePermission,articleController.getArticleCount);
router.route('/admin/article/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,articleController.getArticle);
router.route('/admin/article/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,articleController.updateArticle);    
router.route('/admin/article/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,articleController.partialUpdateArticle);
router.route('/admin/article/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,articleController.softDeleteArticle);
router.route('/admin/article/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,articleController.softDeleteManyArticle);
router.route('/admin/article/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,articleController.bulkInsertArticle);
router.route('/admin/article/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,articleController.bulkUpdateArticle);
router.route('/admin/article/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,articleController.deleteArticle);
router.route('/admin/article/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,articleController.deleteManyArticle);

module.exports = router;
