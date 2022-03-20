const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
// add the code for additional models so we can CRUD them
module.exports = router;
