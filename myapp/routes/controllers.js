const con = require('../db/config');

const get = {
    index : (req, res) => {
        console.log(req.session);
        if(req.session.user){
            console.log("사용자로 로그인");
            res.redirect('/index_user');
        }
        else if(req.session.admin){
            console.log("관리자로 로그인");
            res.redirect('/index_admin');
        }
        else
            res.render('index');
        res.redirect('/login');
    },
    indexForAdmin : (req, res) => {
        console.log(req.session);
        if(req.session.admin)
            res.render('index_admin')
        else{
            res.redirect('/');
        }
    },
    indexForUser : (req, res) => {
        console.log(req.session);
        if(req.session.user){
            console.log("사용자로 로그인");
            res.render('index_user', req.session.user);
        }
        else
            res.redirect('/');
    },
    //redirect -> url로 이동시킴, render -> 템플릿 출력
    lockerForAdmin : (req, res) => {
        if(req.session.admin)
            res.render('locker_for_admin');
        else
            res.redirect('/');
    },
    lockerForUser : (req, res) => {
        if(req.session.user)
            res.render('locker_for_user');
        else
            res.redirect('/');
    },
    registerChoice : (req, res) => {
        res.render('register_choice');
    },
    registerForAdmin : (req, res) => {
        res.render('register_for_admin');
    },
    registerForUser : (req, res) => {
        res.render('register_for_user');
    },
    mypageForUser : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        console.log(req.session);
        if(req.session.user)
            res.render('mypage_for_user');
        else
            res.redirect('/');
    },
    mypageForAdmin : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        console.log(req.session);
        if(req.session.admin)
            res.render('mypage_for_admin');
        else
            res.redirect('/');
    },
    login : (req, res) => {
        //데이터베이스 확인 후, 작업
        res.render('login');
    },
    logout : (req, res) => {
        if(req.session.user){
            console.log('로그아웃 처리');
            //req.session.admin.destory 안됨.
            req.session.destroy(
                function (err){
                    if(err){
                        console.log('세션 삭제시 에러');
                        return;
                    }
                    console.log('세션 삭제 성공');
                    res.redirect('/');
                    //에러 있을겁니다. 추후 수정할게요.
                }
            );
        }

        else if(req.session.admin){
            console.log('로그아웃 처리');
            req.session.destroy(
                function (err){
                    if(err){
                        console.log('세션 삭제시 에러');
                        return;
                    }
                    console.log('세션 삭제 성공');
                    res.redirect('/');
                    //에러 있을겁니다. 추후 수정할게요.
                }
            );
        }

        else{
            console.log("로그인 안 되어있음");
            res.redirect('/');
        }
    }
};

const rest = {
    userList : (req, res) => {
        const sql = `SELECT * FROM USER`;
        con.query(sql, function(err, rows, fields){
            console.log(rows);
            console.log('실행됨');
            if(err)
                throw err;
            else{
                //res.redirect('/');
                res.send(rows);
            }
        })
    },
    adminList : (req, res) => {
        const sql = `SELECT * FROM ADMIN`;
        con.query(sql, function(err, rows, fields){
            console.log(typeof(rows));
            console.log('실행됨');
            if(err)
                throw err;
            else{
                //res.redirect('/');
                res.send(rows);
            }
        })
    },
    findUserById : (req, res) => {
        let id = req.params.id;
        const sql = `SELECT * FROM USER WHERE userid = ?`;
        const params = [id];
        con.query(sql, params, function(err, rows, fields){
            console.log('실행됨');
            if(err)
                throw err;
            else{
                //res.redirect('/');
                res.json(rows);
            }
        })
    },
    findAdminById : (req, res) => {
        let id = req.params.id;
        const sql = `SELECT * FROM USER WHERE userid = ?`;
        const params = [id];
        con.query(sql, params, function(err, rows, fields){
            console.log('실행됨');
            if(err)
                throw err;
            else{
                //res.redirect('/');
                res.json(rows);
            }
        })
    }
}
const process = {
    registerProcessForUser : (req, res) => {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phonenum;
        let password = req.body.password;
        let team = req.body.team;
        email = email + '@sju.ac.kr';
        console.log(id, name, email, phone, password, team);
        const sql = `INSERT INTO USER (userid, name, email, phonenum, password, team) values (?, ?, ?, ?, ?, ?)`;
        const params = [id, name, email, phone, password, team];
        con.query(sql, params, function(err, rows, fields){
            if(err)
                throw err;
            else{
                console.log(rows);
                // res.send('회원가입이 완료되었습니다.');
                res.render('login');
            }
        })
        //res.redirect('/register_choice');
    },
    registerProcessForAdmin : (req, res) => {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phonenum;
        let password = req.body.password;
        let team = req.body.cbTeams;
        email = email + '@sju.ac.kr';
        console.log(id, name, email, phone, password, team);
        const sql = `INSERT INTO ADMIN (adminid, name, email, phonenum, password, team) values (?, ?, ?, ?, ?, ?)`;
        const params = [id, name, email, phone, password, team];
        con.query(sql, params, function(err, rows, fields){
            if(err)
                throw err;
            else{
                console.log(rows);
                // res.send('회원가입이 완료되었습니다.');
                res.render('login');
            }
        })
    },

    loginProcessForUser : (req, res) => {
        //세션이 없는 경우 세션 발급
        let id = req.body.userId;
        let password = req.body.userPassword;
        const sql = 'SELECT * FROM USER WHERE userid = ? AND password = ?';
        const params = [id, password];
        console.log(id, password);
        con.query(sql, params, function(err, rows, fields){
            console.log(rows.length); // row.length가 쿼리 결과물이라 보시면 됩니다. 0보다 크다는 것은 결과물이 있다는 것을 의미합니다.
            console.log(rows[0]);
            if(err)
                throw err;
            if(rows.length > 0){
                if(req.session.user){
                    console.log("이미 로그인 되어 있음");
                }
                else{
                    req.session.user = {
                        id : rows[0].userid,
                        name : rows[0].name,
                        email : rows[0].email,
                        phonenum : rows[0].phonenum,
                        password : rows[0].password,
                        team : rows[0].team
                    }
                    console.log("로그인 처음 됨");
                }
                res.redirect('/index_user');
            }
            else{
                //로그인이 안 된 경우
                res.redirect('/login');
            }
            
        })
    },
    loginProcessForAdmin : (req, res) => {
        //세션이 없는 경우 세션 발급
        let id = req.body.adminId;
        let password = req.body.adminPassword;
        const sql = 'SELECT * FROM ADMIN WHERE adminid = ? AND password = ?';
        const params = [id, password];
        console.log(id, password);
        con.query(sql, params, function(err, rows, fields){
            console.log(rows.length); // row.length가 쿼리 결과물이라 보시면 됩니다. 0보다 크다는 것은 결과물이 있다는 것을 의미합니다.
            console.log(rows[0]);
            if(err)
                throw err;
            if(rows.length > 0){
                if(req.session.admin){
                    console.log("이미 로그인 되어 있음");
                }
                else{
                    req.session.admin = {
                        id : rows[0].adminid,
                        name : rows[0].name,
                        email : rows[0].email,
                        phonenum : rows[0].phonenum,
                        password : rows[0].password,
                        team : rows[0].team
                    }
                    console.log("로그인 처음 됨");
                }
                res.redirect('/index_admin');
            }
            else{
                //로그인이 안 된 경우
                res.redirect('/login');
            }
            
        })
    },

    deleteProcessForUser : (req, res) => {
        console.log(req.session.user.id);
        const sql = `delete from user where userid = ?`;
        const params = [req.session.user.id];
        con.query(sql, params, function(err, rows, fields){
            if(err)
                throw err;
            else{
                console.log(rows[0]);
                req.session.destroy(
                    function (err){
                        if(err){
                            console.log('세션 삭제시 에러');
                            return;
                        }
                        console.log('세션 삭제 성공');
                        //에러 있을겁니다. 추후 수정할게요.
                    }
                );
                // res.send('사용자 회원탈퇴가 완료되었습니다.');
                res.redirect('/');
            }
        })
        // res.render('index');
    },
    deleteProcessForAdmin : (req, res) => {
        console.log(req.session.admin.id);
        const sql = `delete from admin where adminid = ?`;
        const params = [req.session.admin.id];
        con.query(sql, params, function(err, rows, fields){
            if(err)
                throw err;
            else{
                console.log(rows[0]);
                req.session.destroy(
                    function (err){
                        if(err){
                            console.log('세션 삭제시 에러');
                            return;
                        }
                        console.log('세션 삭제 성공');
                        //에러 있을겁니다. 추후 수정할게요.
                    }
                );
                // res.send('관리자 회원탈퇴가 완료되었습니다.');
                res.redirect('/');
            }
        })
        // res.render('index');
    },

}

module.exports = {
    get,
    process,
    rest
}