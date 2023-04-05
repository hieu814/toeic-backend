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

router.route('/device/api/v1/article/create').post(auth(PLATFORM.DEVICE),articleController.addArticle);
router.route('/device/api/v1/article/list').post(auth(PLATFORM.DEVICE),articleController.findAllArticle);
router.route('/device/api/v1/article/count').post(auth(PLATFORM.DEVICE),articleController.getArticleCount);
router.route('/device/api/v1/article/:id').get(auth(PLATFORM.DEVICE),articleController.getArticle);
router.route('/device/api/v1/article/update/:id').put(auth(PLATFORM.DEVICE),articleController.updateArticle);    
router.route('/device/api/v1/article/partial-update/:id').put(auth(PLATFORM.DEVICE),articleController.partialUpdateArticle);
router.route('/device/api/v1/article/softDelete/:id').put(auth(PLATFORM.DEVICE),articleController.softDeleteArticle);
router.route('/device/api/v1/article/softDeleteMany').put(auth(PLATFORM.DEVICE),articleController.softDeleteManyArticle);
router.route('/device/api/v1/article/addBulk').post(auth(PLATFORM.DEVICE),articleController.bulkInsertArticle);
router.route('/device/api/v1/article/updateBulk').put(auth(PLATFORM.DEVICE),articleController.bulkUpdateArticle);
router.route('/device/api/v1/article/delete/:id').delete(auth(PLATFORM.DEVICE),articleController.deleteArticle);
router.route('/device/api/v1/article/deleteMany').post(auth(PLATFORM.DEVICE),articleController.deleteManyArticle);

module.exports = router;
