const express = require('express');
const router = express.Router();
const controller = require('./controllers');

// nodemailer를 위한 모듈
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
let appDir = path.dirname(__dirname);

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
router.get('/register/userEmailcheck', controller.get.checkUserEmail);
router.get('/register/adminEmailcheck', controller.get.checkAdminEmail);
router.get('/locker/lockernameCheck', controller.get.checkLockerName);
router.get('/locker/showLockerName', controller.get.showLockerName);
router.get('/locker/showLockerNotice', controller.get.showNotice);
router.get('/locker_list_for_admin/printLocker', controller.get.printTable);

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
router.post('/selectlocker', controller.process.selectLocker);

/* HTML 사용시 이용
router.get('/', function(req, res, next) {
  res.render('index.html');
});*/

router.get('/register/authEmail', async(req, res) => {
  let authEmail = req.query.authEmail;
  let authNum = Math.random().toString().substr(2,6);
  console.log("## 이메일 넘겨짐" + authEmail);
  /*
  // console.log(appDir);
  authEmail += "@sju.ac.kr"
  let emailTemplete;
  ejs.renderFile(appDir+'/routes/authMail.ejs', {authCode : authNum}, function (err, data) {
    if(err){console.log(err)}
    emailTemplete = data;
  });

  let transporter = nodemailer.createTransport({
    // 여기를 mailtrap계정의 내용으로 변경하시면 이메일 전송 여부 확인 가능
      host: 'smtp.mailtrap.io',
      port: 2525,
      secure: false,
      auth: {
          user: "33ac9092d6325e",
          pass: "faadb9b103f543",
      },
  });

  let mailOptions = {
      from: `noreply@SejongLocker.com`,
      to: authEmail,
      // to: "981e84eae5-96c52d@inbox.mailtrap.io",
      subject: '회원가입을 위한 인증번호를 입력해주세요.',
      html: emailTemplete,
  };

  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      }
      console.log("Finish sending email : " + info.response);
      transporter.close()
  });
  */
  res.json({
    authNum : authNum,
    authEmail : authEmail
  });
  
});

module.exports = router;