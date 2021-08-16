const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const controller = require('./controllers');
/* GET home page. */

router.get('/', controller.get.index);
router.get('/locker', controller.get.locker);
router.get('/login', controller.get.login);
router.get('/logout', controller.get.logout);
router.get('/register', controller.get.register);
router.get('/locker_list_for_user', controller.get.lockerListForUser);
router.get('/locker_list_for_admin', controller.get.lockerListForAdmin);
router.get('/mypage', controller.get.mypage);
router.get('/register/userIdcheck', controller.get.checkUserId);
router.get('/register/adminIdcheck', controller.get.checkAdminId);

router.get('/user_list', controller.rest.userList);
router.get('/admin_list', controller.rest.adminList);
router.get('/find_user/:id', controller.rest.findUserById);
router.get('/find_admin/:id', controller.rest.findAdminById);

router.post('/registerProcess', controller.process.registerProcess);
router.post('/loginProcessForUser', controller.process.loginProcessForUser);
router.post('/loginProcessForAdmin', controller.process.loginProcessForAdmin);
router.post('/updateProcessForUser', controller.process.updateProcessForUser);
router.post('/updateProcessForAdmin', controller.process.updateProcessForAdmin);
router.post('/deleteProcessForUser', controller.process.deleteProcessForUser);
router.post('/deleteProcessForAdmin', controller.process.deleteProcessForAdmin);

router.post('/makelocker', controller.process.makeLocker);

/* HTML 사용시 이용
router.get('/', function(req, res, next) {
  res.render('index.html');
});*/
module.exports = router;
