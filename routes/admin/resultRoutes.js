/**
 * resultRoutes.js
 * @description :: CRUD API routes for result
 */

const express = require('express');
const router = express.Router();
const resultController = require('../../controller/admin/resultController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/result/create').post(auth(PLATFORM.ADMIN),checkRolePermission,resultController.addResult);
router.route('/admin/result/list').post(auth(PLATFORM.ADMIN),checkRolePermission,resultController.findAllResult);
router.route('/admin/result/count').post(auth(PLATFORM.ADMIN),checkRolePermission,resultController.getResultCount);
router.route('/admin/result/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,resultController.getResult);
router.route('/admin/result/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,resultController.updateResult);    
router.route('/admin/result/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,resultController.partialUpdateResult);
router.route('/admin/result/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,resultController.softDeleteResult);
router.route('/admin/result/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,resultController.softDeleteManyResult);
router.route('/admin/result/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,resultController.bulkInsertResult);
router.route('/admin/result/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,resultController.bulkUpdateResult);
router.route('/admin/result/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,resultController.deleteResult);
router.route('/admin/result/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,resultController.deleteManyResult);

module.exports = router;
