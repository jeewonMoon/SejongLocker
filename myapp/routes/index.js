const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const controller = require('./controllers');
/* GET home page. */

router.get('/', controller.index);
router.post('/', controller.index);

router.get('/index_admin', controller.index_for_admin);
router.post('/index_admin', controller.index_for_admin);

router.get('/index_user', controller.index_for_user);
router.post('/index_user', controller.index_for_user);

router.get('/locker_for_admin', controller.locker_for_admin);
router.get('/locker_for_user', controller.locker_for_user);

router.get('/login', controller.login);

router.get('/register_choice', controller.register_choice);
router.get('/register_for_admin', controller.register_for_admin);
router.get('/register_for_user', controller.register_for_user);

router.get('/mypage_for_admin', controller.mypage_for_admin);
router.get('/mypage_for_user', controller.mypage_for_user);

/* HTML 사용시 이용
router.get('/', function(req, res, next) {
  res.render('index.html');
});*/
module.exports = router;
