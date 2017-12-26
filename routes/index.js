const express  = require('express');
const router   = express.Router();
const ctrlUser = require('../controllers/users'); 

router.get('/', ctrlUser.searchUsers);

router.post('/user/search', ctrlUser.findUsers);

module.exports = router;