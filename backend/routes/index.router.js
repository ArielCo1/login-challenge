const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user-controller');
const jwtHelper = require('../config/jwt-helper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/users', ctrlUser.users);

module.exports = router;
