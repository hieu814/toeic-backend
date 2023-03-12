/**
 * article_categoryRoutes.js
 * @description :: CRUD API routes for article_category
 */

const express = require('express');
const router = express.Router();
const article_categoryController = require('../../../controller/client/v1/article_categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/article_category/create').post(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.addArticle_category);
router.route('/client/api/v1/article_category/list').post(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.findAllArticle_category);
router.route('/client/api/v1/article_category/count').post(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.getArticle_categoryCount);
router.route('/client/api/v1/article_category/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.getArticle_category);
router.route('/client/api/v1/article_category/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.updateArticle_category);    
router.route('/client/api/v1/article_category/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.partialUpdateArticle_category);
router.route('/client/api/v1/article_category/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.softDeleteArticle_category);
router.route('/client/api/v1/article_category/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.softDeleteManyArticle_category);
router.route('/client/api/v1/article_category/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.bulkInsertArticle_category);
router.route('/client/api/v1/article_category/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.bulkUpdateArticle_category);
router.route('/client/api/v1/article_category/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.deleteArticle_category);
router.route('/client/api/v1/article_category/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,article_categoryController.deleteManyArticle_category);

module.exports = router;
