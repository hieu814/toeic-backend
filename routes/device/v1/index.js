/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./resultRoutes'));
router.use(require('./word_categoryRoutes'));
router.use(require('./wordRoutes'));
router.use(require('./group_questionRoutes'));
router.use(require('./examRoutes'));
router.use(require('./exam_categoryRoutes'));
router.use(require('./article_categoryRoutes'));
router.use(require('./articleRoutes'));
router.use(require('./userRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./bannerRoutes'));
router.use(require('./uploadRoutes'));
router.use(require('./word_topicRoutes'));
router.use(require('./translateRoutes'));

module.exports = router;
