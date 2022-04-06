const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Endpoint /api
router.use('/thought',thoughtRoutes);
router.use('/user',userRoutes);

module.exports = router;