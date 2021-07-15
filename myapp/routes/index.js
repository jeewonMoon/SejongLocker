const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

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

module.exports = router;
