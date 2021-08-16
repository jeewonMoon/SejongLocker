const con = require('../db/config');
const get = {
    index : (req, res) => {
        console.log(req.session);
        if(!(req.session.user) && !(req.session.admin)){
            console.log('세션 없음');
            res.render('index', {info : ''});
        }
        else if(req.session.user){
            console.log("사용자로 로그인");
            res.render('index', {info : req.session.user, user : "user", admin : ""}); // 빈 값만 안 보내면 되긴 합니다.
        }
        else if(req.session.admin){
            console.log("관리자로 로그인");
            res.render('index', {info : req.session.admin, user : "", admin : "admin"}); // 빈 값만 안 보내면 되긴 합니다.
        }
    },
    locker : (req, res) => {
        console.log(req.session);
        if(!(req.session.user) && !(req.session.admin)){
            console.log('세션 없음');
            res.redirect('/');
        }
        else if(req.session.user){
            console.log("사용자 사물함");
            res.render('locker', {info : req.session.user, user : "user", admin : ""}); // 빈 값만 안 보내면 되긴 합니다.
        }
        else if(req.session.admin){
            console.log("관리자 사물함");
            res.render('locker_for_admin', {info : req.session.admin, user : "", admin : "admin"}); // 빈 값만 안 보내면 되긴 합니다.
        }
    },
    register : (req, res) => {
        if(!(req.session.user) && !(req.session.admin)){
            console.log('세션 없음');
            res.render('register');
        }
        else if(req.session.user){
            console.log("이미 사용자로 로그인");
            res.redirect('/');
        }
        else if(req.session.admin){
            console.log("이미 관리자로 로그인");
            res.redirect('/');
        }
    },
    lockerListForUser : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        console.log(req.session);
        if(!(req.session.user)){
            console.log('세션 없음');
            res.redirect('/');
        }
        else if(req.session.user){
            console.log('사용자 사물함 내역 불러오기');
            // let id = req.session.user.id;
            // const sql = `SELECT name, email, userid, phonenum, team FROM user WHERE userid = ?`;
            // const params = [id];
            // con.query(sql, params, function(err, rows, fields){
            //     if(err){
            //         console.log('실패');
            //         throw err;
            //     }
            //     else{
            //         console.log('성공');
            //         console.log(rows[0]);
            //         res.render('mypage', {info : req.session.user, user : "user", admin : ""}); // 빈 값만 안 보내면 되긴 합니다.
            //         //res.render('mypage', {userInfo : rows[0]});    //userInfo 객체에 정보 담기
            //     }
            // })
            res.render('locker_list_for_user', {info : req.session.user, user : "user", admin : ""});
        }
    },
    lockerListForAdmin : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        console.log(req.session);
        if(!(req.session.admin)){
            console.log('세션 없음');
            res.redirect('/');
        }
        else if(req.session.admin){
            console.log('관리자 사물함 내역 불러오기');
            // let id = req.session.admin.id;
            // const sql = `SELECT name, email, adminid, phonenum, teamname FROM admin, team WHERE adminid = ? and team.teamid=admin.team`;
            // const params = [id];
            // con.query(sql, params, function(err, rows, fields){
            //     if(err){
            //         console.log('실패');
            //         throw err;
            //     }
            //     else{
            //         console.log('성공');
            //         console.log(rows);
            //         // res.render('mypage', {info : req.session.admin, user : "", admin : "admin"}); // 빈 값만 안 보내면 되긴 합니다.
            //         res.render('mypage', {info : rows[0], user : "", admin : "admin"}); 
            //     }
            // })
            res.render('locker_list_for_admin', {info : req.session.admin, user : "", admin : "admin"}); 
        }
    },
    mypage : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        console.log(req.session);
        if(!(req.session.user) && !(req.session.admin)){
            console.log('세션 없음');
            res.redirect('/');
        }
        else if(req.session.user){
            console.log('사용자 정보 불러오기');
            let id = req.session.user.id;
            const sql = `SELECT name, email, userid, phonenum, team FROM user WHERE userid = ?`;
            const params = [id];
            con.query(sql, params, function(err, rows, fields){
                if(err){
                    console.log('실패');
                    throw err;
                }
                else{
                    console.log('성공');
                    console.log(rows[0]);
                    res.render('mypage', {info : req.session.user, user : "user", admin : ""}); // 빈 값만 안 보내면 되긴 합니다.
                    //res.render('mypage', {userInfo : rows[0]});    //userInfo 객체에 정보 담기
                }
            })
        }
        else if(req.session.admin){
            console.log('관리자 정보 불러오기');
            let id = req.session.admin.id;
            const sql = `SELECT name, email, adminid, phonenum, team FROM admin WHERE adminid = ?`;
            const params = [id];
            con.query(sql, params, function(err, rows, fields){
                if(err){
                    console.log('실패');
                    throw err;
                }
                else{
                    console.log('성공');
                    console.log(rows);
                    // res.render('mypage', {info : req.session.admin, user : "", admin : "admin"}); // 빈 값만 안 보내면 되긴 합니다.
                    res.render('mypage', {info : req.session.admin, user : "", admin : "admin"}); 
                }
            })
        }
    },
    login : (req, res) => {
        //데이터베이스 확인 후, 작업
        if(!(req.session.user) && !(req.session.admin)){
            console.log('세션 없음');
            res.render('login', {message:""});
        }
        else if(req.session.user){
            console.log("이미 사용자로 로그인");
            res.redirect('/');
        }
        else if(req.session.admin){
            console.log("이미 관리자로 로그인");
            res.redirect('/');
        }
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
    },
    checkUserId : async (req, res) => {
        console.log('user id check');
        let id = req.query.id;
        let flag = false;
        const sql = `SELECT userid FROM USER WHERE userid = ?`;
        const params = [id];
        
        const [rows, fields] = await con.query(sql, [
            id
        ]);
        // con.query(sql, params, function(err, rows, fields){
        //     if(err)
        //         throw err;
        //     else{
        //         console.log(rows.length);
        //         if(rows.length > 0){    //존재
        //             flag = false;
        //         }else{
        //             flag = true;
        //         }
        //     }
        // })
        if(rows.length > 0){    //존재
            flag = false;
        }else{
            flag = true;
        }
        console.log(flag);
        res.json({
            login : flag,
            id,
        })
    },
    checkAdminId : async (req, res) => {
        console.log('admin id check');
        let id = req.query.id;
        let flag = false;
        const sql = `SELECT adminid FROM ADMIN WHERE adminid = ?`;
        const params = [id];
        
        const [rows, fields] = await con.query(sql, [
            id
        ]);
        if(rows.length > 0){    //존재
            flag = false;
        }else{
            flag = true;
        }
        console.log(flag);
        res.json({
            login : flag,
            id,
        })
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
        const sql = `SELECT * FROM USER WHERE adminid = ?`;
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
    registerProcess : (req, res) => {
        let id = req.body.id;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phonenum;
        let password = req.body.password;
        let team = req.body.team;
        email = email + '@sju.ac.kr';
        // console.log(id, name, email, phone, password, team);
        console.log(req.body.radioCheck);

        if(req.body.radioCheck == "사용자"){
            const sql = `INSERT INTO USER (userid, name, email, phonenum, password, team) values (?, ?, ?, ?, ?, ?)`;
            const params = [id, name, email, phone, password, team];
            con.query(sql, params, function(err, rows, fields){
                if(err)
                    throw err;
                else{
                    console.log(rows);
                    // res.send('회원가입이 완료되었습니다.');
                    res.render('login', {message:"사용자 회원가입이 완료되었습니다."});
                }
            })
            //res.redirect('/register_choice');
        }
        else if(req.body.radioCheck == "관리자"){
            const sql = `INSERT INTO ADMIN (adminid, name, email, phonenum, password, team) values (?, ?, ?, ?, ?, ?)`;
            const params = [id, name, email, phone, password, team];
            con.query(sql, params, function(err, rows, fields){
                if(err)
                    throw err;
                else{
                    console.log(rows);
                    // res.send('회원가입이 완료되었습니다.');
                    res.render('login', {message:"관리자 회원가입이 완료되었습니다."});
                }
            })
        }
        else
            res.redirect('/register');
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
                res.redirect('/');
                //res.redirect('/index_user');
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
                res.redirect('/');
                //res.redirect('/index_admin');
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
    },
    updateProcessForUser : (req, res) => {
        const sql = `update user set password = ? where userid = ?`;
        const params = [req.body.password, req.session.user.id];
        console.log(params);
        con.query(sql, params, function(err, rows, fields){
            if(err)
                throw err;
            else{
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
                res.redirect('/login');
            }
        })
    },
    updateProcessForAdmin : (req, res) => {
        console.log(req.session.admin.id);
        const sql = `update admin set password = ? where adminid = ?`;
        const params = [req.body.password, req.session.admin.id];
        console.log(params);
        con.query(sql, params, function(err, rows, fields){
            if(err)
                throw err;
            else{
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
                res.redirect('/login');
            }
        })
    },

    makeLocker : (req, res) => {
        console.log(req.body);
        let adminid = req.session.admin.id;
        let building = req.body.building;
        let lockername = req.body.lockername;
        let notice = req.body.notice;
        let lockerrow = req.body.lockerrow;
        let lockercol = req.body.lockercol;
        let len = lockerrow * lockercol;

        const sql = `INSERT INTO locker_parent (adminid, building, lockername, notice, lockerrow, lockercol) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [adminid, building, lockername, notice, lockerrow, lockercol];
        console.log(params);
        con.query(sql, params, function(err, rows, fields){
            if(err)
                throw err;
            else{
                const sql2 ='CREATE TABLE IF NOT EXISTS userdb.' + lockername +'(lockername VARCHAR(45) NOT NULL, lockernum INT NOT NULL, canuse INT NOT NULL, exceptuse INT NOT NULL, userid INT NULL, PRIMARY KEY (lockernum), INDEX fk_'+lockername+'_user1_idx (userid ASC) VISIBLE, INDEX fk_'+lockername+'_locker_parent1_idx (lockername ASC) VISIBLE, CONSTRAINT fk_'+lockername+'_user1 FOREIGN KEY (userid) REFERENCES userdb.user (userid) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT fk_'+lockername+'_locker_parent1 FOREIGN KEY (lockername) REFERENCES userdb.locker_parent (lockername) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB';
                con.query(sql2,function(err2, rows2, fields2){
                    if(err2)
                        throw err2;
                    else{
                        // console.log('table is created!');
                        let sql3 = '';
                        let params3 = [];
                        for(let num = 1; num <= len; num++){
                            sql3 = 'INSERT INTO ' + lockername + '(lockername, lockernum, canuse, exceptuse) VALUES (?, ?, ?, ?)';
                            let lockernumber = "locker" + num;
                            if(req.body.hasOwnProperty(lockernumber)){
                                // console.log(req.body[lockernumber]);
                                if(req.body[lockernumber] == "YES")
                                    params3 = [lockername, num, 0, 1];
                                else
                                    params3 = [lockername, num, 1, 0];
                            }
                            else{
                                console.log('lockernumber is wrong!');
                                break;
                            }
                            con.query(sql3, params3, function(err3, rows3, fields3){
                                if(err3)
                                    throw err3;
                                else{
                                    console.log(lockernumber + " is inserted!");
                                }
                            })
                        }

                    }
                })

                // res.redirect('/locker_list_for_admin');
            }
        })
        res.redirect('/locker');
    }
}

module.exports = {
    get,
    process,
    rest
}