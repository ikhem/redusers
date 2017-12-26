const express  = require('express');
const router   = express.Router();
const ctrlUser = require('../controllers/users'); 

router.get('/', ctrlUser.searchUsers);

router.post('/user/search', ctrlUser.findUsers);

router.post('/user/add', ctrlUser.processUser);

router.get('/user/add', ctrlUser.addUser);

router.delete('/user/delete/:id', ctrlUser.deleteUser);

module.exports = router;