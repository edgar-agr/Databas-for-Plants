const express =  require('express');
const users = require('../controller/users');

const router = express.Router();

router.get('/users',users.getUsers);

router. post('/users', users.deleteUser);

router.get('/adduser',users.getAdduser);

router.post('/adduser',users.postUser);

router.get('/edituser/:id',users.getEditUser);

module.exports = router;