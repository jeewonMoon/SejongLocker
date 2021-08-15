const axios = require('axios');
const { con } = require('../db/config');

// axios.get('/idCheck', (req, res) => {
//     let id = req.body.id;
//     if(req.body.radioCheck == "사용자"){
//         console.log('사용자 id 중복확인');
//         const sql = `SELECT userid FROM USER WHERE userid = ?`;
//         const params = [id];
//         con.query(sql, params, function(err, rows, fields){
//             if(err)
//                 throw err;
//             else{
//                 console.log(rows);
//                 if(rows.length > 0){
//                     alert('이미 존재하는 학번입니다.');
//                 }
//             }
//         })
//     }else if(req.body.radioCheck == "관리자"){
//         console.log('관리자 id 중복확인');
//         const sql = `SELECT adminid FROM ADMIN WHERE adminid = ?`;
//         const params = [id];
//         con.query(sql, params, function(err, rows, fields){
//             if(err)
//                 throw err;
//             else{
//                 console.log(rows);
//                 if(rows.length > 0){
//                     alert('이미 존재하는 학번입니다.');
//                 }
//             }
//         })
//     }
//     else
//         res.redirect('/register');
// })