const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const controller = require('./controllers');
/* GET home page. */

router.get('/', controller.get.index);

/*
router.get('/index_admin', controller.get.index_for_admin);
router.get('/index_user', controller.get.index_for_user);
*/
router.get('/index_admin', controller.get.indexForAdmin);
router.get('/index_user', controller.get.indexForUser);

/*
router.get('/locker_for_admin', controller.get.locker_for_admin);
router.get('/locker_for_user', controller.get.locker_for_user);
*/

router.get('/locker_for_admin', controller.get.lockerForAdmin);
router.get('/locker_for_user', controller.get.lockerForUser);

router.get('/login', controller.get.login);
router.post('/loginProcessForUser', controller.process.loginProcessForUser);
router.post('/loginProcessForAdmin', controller.process.loginProcessForAdmin);

router.post('/registerProcessForUser', controller.process.registerProcessForUser);
router.post('/registerProcessForAdmin', controller.process.registerProcessForAdmin);

router.get('/logout', controller.get.logout);

/*
router.get('/register_choice', controller.get.register_choice);
router.get('/register_for_admin', controller.get.register_for_admin);
router.get('/register_for_user', controller.get.register_for_user);
*/

router.get('/register_choice', controller.get.registerChoice);
router.get('/register_for_admin', controller.get.registerForAdmin);
router.get('/register_for_user', controller.get.registerForUser);

/*
router.get('/mypage_for_admin', controller.get.mypage_for_admin);
router.get('/mypage_for_user', controller.get.mypage_for_user);
*/

router.get('/mypage_for_admin', controller.get.mypageForAdmin);
router.get('/mypage_for_user', controller.get.mypageForUser);

/* HTML 사용시 이용
router.get('/', function(req, res, next) {
  res.render('index.html');
});*/
module.exports = router;
