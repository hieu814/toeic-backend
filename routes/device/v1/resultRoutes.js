/**
 * resultRoutes.js
 * @description :: CRUD API routes for result
 */

const express = require('express');
const router = express.Router();
const resultController = require('../../../controller/device/v1/resultController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/result/create').post(auth(PLATFORM.DEVICE),checkRolePermission,resultController.addResult);
router.route('/device/api/v1/result/list').post(auth(PLATFORM.DEVICE),checkRolePermission,resultController.findAllResult);
router.route('/device/api/v1/result/count').post(auth(PLATFORM.DEVICE),checkRolePermission,resultController.getResultCount);
router.route('/device/api/v1/result/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,resultController.getResult);
router.route('/device/api/v1/result/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,resultController.updateResult);    
router.route('/device/api/v1/result/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,resultController.partialUpdateResult);
router.route('/device/api/v1/result/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,resultController.softDeleteResult);
router.route('/device/api/v1/result/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,resultController.softDeleteManyResult);
router.route('/device/api/v1/result/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,resultController.bulkInsertResult);
router.route('/device/api/v1/result/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,resultController.bulkUpdateResult);
router.route('/device/api/v1/result/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,resultController.deleteResult);
router.route('/device/api/v1/result/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,resultController.deleteManyResult);

module.exports = router;
