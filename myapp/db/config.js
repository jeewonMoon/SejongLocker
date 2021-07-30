const mysql = require('mysql');
const con = mysql.createConnection({
  host:'localhost',
  port:3306,
  user :'user1234',
  password:'1234',
  database : 'userdb'
});

con.connect(function(err){
  if(err) throw err;
  console.log("데이터베이스에 연결되었습니다.");
});

module.exports = con;