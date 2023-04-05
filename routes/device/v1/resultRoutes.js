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

router.route('/device/api/v1/result/create').post(auth(PLATFORM.DEVICE),resultController.addResult);
router.route('/device/api/v1/result/list').post(auth(PLATFORM.DEVICE),resultController.findAllResult);
router.route('/device/api/v1/result/count').post(auth(PLATFORM.DEVICE),resultController.getResultCount);
router.route('/device/api/v1/result/:id').get(auth(PLATFORM.DEVICE),resultController.getResult);
router.route('/device/api/v1/result/update/:id').put(auth(PLATFORM.DEVICE),resultController.updateResult);    
router.route('/device/api/v1/result/partial-update/:id').put(auth(PLATFORM.DEVICE),resultController.partialUpdateResult);
router.route('/device/api/v1/result/softDelete/:id').put(auth(PLATFORM.DEVICE),resultController.softDeleteResult);
router.route('/device/api/v1/result/softDeleteMany').put(auth(PLATFORM.DEVICE),resultController.softDeleteManyResult);
router.route('/device/api/v1/result/addBulk').post(auth(PLATFORM.DEVICE),resultController.bulkInsertResult);
router.route('/device/api/v1/result/updateBulk').put(auth(PLATFORM.DEVICE),resultController.bulkUpdateResult);
router.route('/device/api/v1/result/delete/:id').delete(auth(PLATFORM.DEVICE),resultController.deleteResult);
router.route('/device/api/v1/result/deleteMany').post(auth(PLATFORM.DEVICE),resultController.deleteManyResult);

module.exports = router;
