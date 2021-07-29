const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const controller = require('./controllers');
/* GET home page. */

router.get('/', controller.get.index);
router.post('/', controller.post.index);

router.get('/index_admin', controller.get.index_for_admin);
router.post('/index_admin', controller.post.index_for_admin);

router.get('/index_user', controller.get.index_for_user);
router.post('/index_user', controller.post.index_for_user);

router.get('/locker_for_admin', controller.get.locker_for_admin);
router.get('/locker_for_user', controller.get.locker_for_user);

router.get('/login', controller.post.login);

router.get('/register_choice', controller.get.register_choice);
router.get('/register_for_admin', controller.get.register_for_admin);
router.get('/register_for_user', controller.get.register_for_user);

router.get('/mypage_for_admin', controller.get.mypage_for_admin);
router.get('/mypage_for_user', controller.get.mypage_for_user);

/* HTML 사용시 이용
router.get('/', function(req, res, next) {
  res.render('index.html');
});*/
module.exports = router;
