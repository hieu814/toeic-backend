/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./resultRoutes'));
router.use(require('./word_categoryRoutes'));
router.use(require('./wordRoutes'));
router.use(require('./questionRoutes'));
router.use(require('./group_questionRoutes'));
router.use(require('./examRoutes'));
router.use(require('./exam_categoryRoutes'));
router.use(require('./article_categoryRoutes'));
router.use(require('./articleRoutes'));
router.use(require('./userRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./bannerRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
