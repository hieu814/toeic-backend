/**
 * resultRoutes.js
 * @description :: CRUD API routes for result
 */

const express = require('express');
const router = express.Router();
const resultController = require('../../../controller/client/v1/resultController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/result/create').post(auth(PLATFORM.CLIENT),checkRolePermission,resultController.addResult);
router.route('/client/api/v1/result/list').post(auth(PLATFORM.CLIENT),checkRolePermission,resultController.findAllResult);
router.route('/client/api/v1/result/count').post(auth(PLATFORM.CLIENT),checkRolePermission,resultController.getResultCount);
router.route('/client/api/v1/result/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,resultController.getResult);
router.route('/client/api/v1/result/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,resultController.updateResult);    
router.route('/client/api/v1/result/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,resultController.partialUpdateResult);
router.route('/client/api/v1/result/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,resultController.softDeleteResult);
router.route('/client/api/v1/result/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,resultController.softDeleteManyResult);
router.route('/client/api/v1/result/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,resultController.bulkInsertResult);
router.route('/client/api/v1/result/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,resultController.bulkUpdateResult);
router.route('/client/api/v1/result/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,resultController.deleteResult);
router.route('/client/api/v1/result/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,resultController.deleteManyResult);

module.exports = router;
