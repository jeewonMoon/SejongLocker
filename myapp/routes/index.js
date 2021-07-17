const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index_admin', function(req, res, next) {
  res.render('index_admin');
});

router.get('/index_user', function(req, res, next) {
  res.render('index_user');
});

router.get('/locker_for_admin', function(req, res, next) {
  res.render('locker_for_admin');
});

router.get('/locker_for_user', function(req, res, next) {
  res.render('locker_for_user');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register_choice', function(req, res, next) {
  res.render('register_choice');
});

router.get('/register_for_admin', function(req, res, next) {
  res.render('register_for_admin');
});

router.get('/register_for_user', function(req, res, next) {
  res.render('register_for_user');
});

router.get('/mypage_user', function(req, res, next) {
  res.render('mypage_user');
});

router.get('/mypage_admin', function(req, res, next) {
  res.render('mypage_admin');
});

/*
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/index_admin', function(req, res, next) {
  res.render('index_admin.html');
});

router.get('/index_user', function(req, res, next) {
  res.render('index_user.html');
});

router.get('/locker_for_admin', function(req, res, next) {
  res.render('locker_for_admin.html');
});

router.get('/locker_for_user', function(req, res, next) {
  res.render('locker_for_user.html');
});

router.get('/login', function(req, res, next) {
  res.render('login.html');
});

router.get('/register_choice', function(req, res, next) {
  res.render('register_choice.html');
});

router.get('/register_for_admin', function(req, res, next) {
  res.render('register_for_admin.html');
});

router.get('/register_for_user', function(req, res, next) {
  res.render('register_for_user.html');
});

router.get('/mypage_user', function(req, res, next) {
  res.render('mypage_user.html');
});

router.get('/mypage_admin', function(req, res, next) {
  res.render('mypage_admin.html');
});
*/
module.exports = router;
