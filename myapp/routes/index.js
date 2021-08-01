const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const controller = require('./controllers');
/* GET home page. */

router.get('/', controller.get.index);
router.get('/index_admin', controller.get.indexForAdmin);
router.get('/index_user', controller.get.indexForUser);
router.get('/locker_for_admin', controller.get.lockerForAdmin);
router.get('/locker_for_user', controller.get.lockerForUser);
router.get('/login', controller.get.login);
router.get('/logout', controller.get.logout);
router.get('/register_choice', controller.get.registerChoice);
router.get('/register_for_admin', controller.get.registerForAdmin);
router.get('/register_for_user', controller.get.registerForUser);
router.get('/mypage_for_admin', controller.get.mypageForAdmin);
router.get('/mypage_for_user', controller.get.mypageForUser);

router.get('/user_list', controller.rest.userList);
router.get('/admin_list', controller.rest.adminList);
router.get('/find_user/:id', controller.rest.findUserById);
router.get('/find_admin/:id', controller.rest.findAdminById);

router.post('/loginProcessForUser', controller.process.loginProcessForUser);
router.post('/loginProcessForAdmin', controller.process.loginProcessForAdmin);
router.post('/registerProcessForUser', controller.process.registerProcessForUser);
router.post('/registerProcessForAdmin', controller.process.registerProcessForAdmin);
router.post('/deleteProcessForUser', controller.process.deleteProcessForUser);
router.post('/deleteProcessForAdmin', controller.process.deleteProcessForAdmin);

/* HTML 사용시 이용
router.get('/', function(req, res, next) {
  res.render('index.html');
});*/
module.exports = router;
