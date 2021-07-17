const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', {title:"사물함 프로젝트"});
});

router.get('/index_admin', function(req, res, next) {
  res.render('index_admin', {title:"사물함 프로젝트"});
});

router.get('/index_user', function(req, res, next) {
  res.render('index_user', {title:"사물함 프로젝트"});
});

router.get('/locker_for_admin', function(req, res, next) {
  res.render('locker_for_admin', {title:"관리자 사물함"});
});

router.get('/locker_for_user', function(req, res, next) {
  res.render('locker_for_user', {title:"사용자 사물함"});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:"로그인"});
});

router.get('/register_choice', function(req, res, next) {
  res.render('register_choice', {title:"회원가입"});
});

router.get('/register_for_admin', function(req, res, next) {
  res.render('register_for_admin', {title:"관리자 회원가입"});
});

router.get('/register_for_user', function(req, res, next) {
  res.render('register_for_user', {title:"사용자 회원가입"});
});

router.get('/mypage_user', function(req, res, next) {
  res.render('mypage_user', {title : "My Page", who : "회원"});
});

router.get('/mypage_admin', function(req, res, next) {
  res.render('mypage_admin', {title : "My Page", who : "관리자"});
});

/*
router.get('/', function(req, res, next) {
  res.render('index.html');
});*/
module.exports = router;
