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
    lockerListForAdmin : async (req, res) => {
        if(!(req.session.admin)){
            console.log('세션 없음');
            res.redirect('/');
        }
        else if(req.session.admin){
            let id = req.session.admin.id;
            const params = [id];
            console.log(req.session);
            
            console.log('관리자 사물함 내역 불러오기');
            try{
                const sql = `SELECT * FROM locker_parent WHERE adminid = ?`;
                const [rows, fileds] = await con.query(sql, params);
                console.log('성공');
                console.log(rows);
                
                res.render('locker_list_for_admin', {info : rows, user : "", admin : "admin", adminSession : req.session.admin}); 
            }catch(error){
                console.log(error);
                throw error;
            }
        }
    },
    mypage : async (req, res) => {
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

            try{
                const [rows, fileds] = await con.query(sql, params);
                console.log('성공');
                console.log(rows[0]);
                res.render('mypage', {info : req.session.user, user : "user", admin : ""}); // 빈 값만 안 보내면 되긴 합니다.
                //res.render('mypage', {userInfo : rows[0]});    //userInfo 객체에 정보 담기
            }catch(error){
                console.log(error);
                throw error;
            }
        }
        else if(req.session.admin){
            console.log('관리자 정보 불러오기');
            let id = req.session.admin.id;
            const sql = `SELECT name, email, adminid, phonenum, team FROM admin WHERE adminid = ?`;
            const params = [id];

            try{
                const [rows, fileds] = await con.query(sql, params);
                console.log('성공');
                console.log(rows);
                // res.render('mypage', {info : req.session.admin, user : "", admin : "admin"}); // 빈 값만 안 보내면 되긴 합니다.
                res.render('mypage', {info : req.session.admin, user : "", admin : "admin"}); 
            }catch(error){
                console.log(error);
                throw error;
            }
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
        console.log('user id CHECK');
        let id = req.query.id;
        let flag = false;
        const sql = `SELECT userid FROM USER WHERE userid = ?`;
        const params = [id];
        
        try{
            const [rows, fields] = await con.query(sql, params);
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
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    checkAdminId : async (req, res) => {
        console.log('admin id CHECK');
        let id = req.query.id;
        let flag = false;
        const sql = `SELECT adminid FROM ADMIN WHERE adminid = ?`;
        const params = [id];
        
        try{
            const [rows, fields] = await con.query(sql, params);

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
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    checkUserEmail : async (req, res) => {
        let email = req.query.email;
        email = email + '@sju.ac.kr';
        let flag = false;
        const params = [email];
        const sql = `SELECT email FROM user WHERE email = ?`;

        console.log('user email CHECK');
        try{
            const [rows, fields] = await con.query(sql, params);
    
            if(rows.length > 0){    //존재
                flag = false;
            }else{
                flag = true;
            }
            console.log(flag);
            res.json({
                login : flag,
                email,
            })
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    checkAdminEmail : async (req, res) => {
        let email = req.query.email;
        email = email + '@sju.ac.kr';
        let flag = false;
        const params = [email];
        const sql = `SELECT email FROM admin WHERE email = ?`;

        console.log('admin email CHECK');
        try{
            const [rows, fields] = await con.query(sql, params);

            if(rows.length > 0){    //존재
                flag = false;
            }else{
                flag = true;
            }
            console.log(flag);
            res.json({
                login : flag,
                email,
            })
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    checkLockerName : async (req, res) => {
        let lockername = req.query.lockername;
        let flag = false;
        const params = [lockername];
        const sql = `SELECT lockername FROM locker_parent WHERE lockername = ?`;

        console.log('lockername CHECK');
        try{
            const [rows, fields] = await con.query(sql, params);

            if(rows.length > 0){    //존재
                flag = false;
            }else{
                flag = true;
            }
            console.log(flag);
            res.json({
                result : flag,
                lockername,
            })
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    showLockerName : async (req, res) => {
        let building = req.query.building;
        let lockernames = [];
        const params = [building];
        const sql = `SELECT lockername FROM locker_parent WHERE building = ?`;

        console.log('SHOW lockername BY building');
        try{
            const [rows, fields] = await con.query(sql, params);

            // console.log(rows);
            if(rows.length > 0){    //존재
                lockernames = rows;
            }
            // console.log(lockernames);
            res.json({
                result : lockernames,
                building,
            })
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    showNotice : async (req, res) => {
        let building = req.query.building;
        let lockername = req.query.lockername;

        // 사물함 공지사항 가져오기
        let notice = "";
        let rowNum;
        let colNum;
        const params = [building, lockername];
        const sql = `SELECT notice, lockerrow, lockercol FROM locker_parent WHERE building = ? AND lockername = ?`;

        // console.log('SHOW notice BY building, lockername');
        try{
            const [rows, fields] = await con.query(sql, params);

            if(rows.length > 0){    //존재
                notice = rows[0].notice;
                rowNum = rows[0].lockerrow;
                colNum = rows[0].lockercol;
            }

            // 사물함 표 가져오기
            const sql2 = `SELECT lockernum, canuse, exceptuse, userid FROM ` + lockername + ` ORDER BY lockernum ASC`

            try{
                const [rows, fields] = await con.query(sql2);

                res.json({
                    lockerrow : rowNum,
                    lockercol : colNum,
                    notice : notice,
                    lockers : rows,
                    building,
                    lockername,
                })
            }catch(error2){
                console.log(error2);
                throw error2;
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    printTable : async (req, res) => {
        console.log('get data from locker_child');
        let lockername = req.query.name;

        const sql = `SELECT * FROM ` + lockername;
        const sql2 = `SELECT lockercol, lockerrow, notice FROM locker_parent WHERE lockername = ?`;
        try {
            const [rows] = await con.query(sql);
            const[rows2, fields] = await con.query(sql2, [lockername]);
            
            // console.log("success");
            // console.log(rows);
            // console.log(rows2);
            res.json({
                table : rows,
                colRow : rows2,
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    changeNotice : async (req, res) => {
        let adminid = req.session.admin.id;
        let lockername = req.query.lockername;
        let notice = req.query.notice;
        let flag = false;

        const sql = `Update locker_parent SET notice = ? WHERE adminid = ? AND lockername = ?`;
        const params = [notice, adminid, lockername];
        try {
            const [rows, fields] = await con.query(sql, params);
            
            if(rows.length > 0){ // 성공
                flag = false;
            }else{          
                flag = true;
            }

            res.json({
                result : flag,
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getLockerNum : async (req, res) => {
        let adminid = req.session.admin.id;
        let lockername = req.query.lockername;

        const sql = `SELECT lockerrow, lockercol FROM locker_parent WHERE adminid = ? AND lockername = ?`;
        const params = [adminid, lockername];
        try {
            const [rows, fields] = await con.query(sql, params);
            
            res.json({
                row : rows[0].lockerrow,
                col : rows[0].lockercol,
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    changeLockerState : async (req, res) => {
        let lockername = req.query.lockername;
        let lockernum = req.query.lockernum;
        let state = req.query.state;
        let flag = false;

        if(state == "useYes"){
            const sql = `Update ` + lockername  + ` SET canuse = 1 , exceptuse = 0 , userid = null WHERE lockername = ? AND lockernum = ` + lockernum;
            const params = [lockername];
            try {
                const [rows, fields] = await con.query(sql, params);
                
                if(rows.length > 0){    // 성공
                    flag = false;
                }else{
                    flag = true;
                }
    
                res.json({
                    result : flag,
                })
            } catch (error) {
                console.log(error);
                throw error;
            }
        }else if(state == "useNo"){
            const sql = `Update ` + lockername + ` SET canuse = 0 , exceptuse = 1 , userid = null WHERE lockername = ? AND lockernum = ` + lockernum;
            const params = [lockername];
            try {
                const [rows, fields] = await con.query(sql, params);
                
                if(rows.length > 0){    // 성공
                    flag = false;
                }else{
                    flag = true;
                }
    
                res.json({
                    result : flag,
                })
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    },
    deleteLocker : async (req, res) => {
        let lockername = req.query.lockername;
        let flag = false;
        
        try{
            const sql = `DROP TABLE IF EXISTS userdb.` + lockername ;
            const [rows, fields] = await con.query(sql);
            console.log("DROP TABLE SUCCESS");

            const sql2 = `DELETE FROM lockeruser WHERE lockername = ?`;
            const params2 = [lockername];
            const [rows2, fields2] = await con.query(sql2, params2);
            console.log("DELETE lockeruser SUCCESS");

            const sql3 = `DELETE FROM locker_parent WHERE lockername = ?`;
            const params3 = [lockername];
            const [rows3, fields3] = await con.query(sql3, params3);
            console.log("DELETE IN locker_parent SUCCESS");

            if(rows.length > 0 && rows2.length > 0 && rows3.length > 0){    // 성공
                flag = false;
            }else{
                flag = true;
            }

            res.json({
                flag : flag,
            })
        }catch(error){
            console.log(error);
            throw error;
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
    registerProcess : async (req, res) => {
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
            try{
                const [rows, fields] = await con.query(sql, params);
                console.log(rows);
                // res.render('login', {message:"사용자 회원가입이 완료되었습니다."});
                res.redirect('/login');
            }catch(error){
                console.log(error);
                throw error;
            }
        }
        else if(req.body.radioCheck == "관리자"){
            const sql = `INSERT INTO ADMIN (adminid, name, email, phonenum, password, team) values (?, ?, ?, ?, ?, ?)`;
            const params = [id, name, email, phone, password, team];
            try{
                const [rows, fields] = await con.query(sql, params);
                console.log(rows);
                // res.render('login', {message:"사용자 회원가입이 완료되었습니다."});
                res.redirect('/login');
            }catch(error){
                console.log(error);
                throw error;
            }
        }
        else
            res.redirect('/register');
    },

    loginProcessForUser : async (req, res) => {
        //세션이 없는 경우 세션 발급
        let id = req.body.userId;
        let password = req.body.userPassword;
        const sql = 'SELECT * FROM USER WHERE userid = ? AND password = ?';
        const params = [id, password];
        console.log(id, password);
        try{
            const [rows, fields] = await con.query(sql, params);
            console.log(rows.length); // row.length가 쿼리 결과물이라 보시면 됩니다. 0보다 크다는 것은 결과물이 있다는 것을 의미합니다.
            console.log(rows[0]);
            if(rows.length > 0){
                if(req.session.user){
                    console.log("##### already Logined #####");
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
                    console.log("##### USER Login SUCCESS #####");
                }
                res.redirect('/');
                //res.redirect('/index_user');
            }
            else{
                //로그인이 안 된 경우
                res.redirect('/login');
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    loginProcessForAdmin : async (req, res) => {
        //세션이 없는 경우 세션 발급
        let id = req.body.adminId;
        let password = req.body.adminPassword;
        const sql = 'SELECT * FROM ADMIN WHERE adminid = ? AND password = ?';
        const params = [id, password];
        console.log(id, password);
        try{
            const [rows, fields] = await con.query(sql, params);
            console.log(rows.length); // row.length가 쿼리 결과물이라 보시면 됩니다. 0보다 크다는 것은 결과물이 있다는 것을 의미합니다.
            console.log(rows[0]);
            if(rows.length > 0){
                if(req.session.admin){
                    console.log("##### already Logined #####");
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
                    console.log("##### ADMIN Login SUCCESS #####");
                }
                res.redirect('/');
                //res.redirect('/index_admin');
            }
            else{
                //로그인이 안 된 경우
                res.redirect('/login');
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    deleteProcessForUser : async (req, res) => {
        console.log(req.session.user.id);
        const sql = `delete from user where userid = ?`;
        const params = [req.session.user.id];
        try{
            const [rows, fields] = await con.query(sql, params);
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
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    deleteProcessForAdmin : async (req, res) => {
        console.log(req.session.admin.id);
        const sql = `delete from admin where adminid = ?`;
        const params = [req.session.admin.id];
        try{
            const [rows, fields] = await con.query(sql, params);
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
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    updateProcessForUser : async (req, res) => {
        const sql = `update user set password = ? where userid = ?`;
        const params = [req.body.password, req.session.user.id];
        console.log(params);
        try{
            const [rows, fields] = await con.query(sql, params);
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
        }catch(error){
            console.log(error);
            throw error;
        }
    },
    updateProcessForAdmin : async (req, res) => {
        console.log(req.session.admin.id);
        const sql = `update admin set password = ? where adminid = ?`;
        const params = [req.body.password, req.session.admin.id];
        console.log(params);
        try{
            const [rows, fields] = await con.query(sql, params);
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
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    makeLocker : async (req, res) => {
        console.log(req.body);
        let adminid = req.session.admin.id;
        let building = req.body.building;
        let lockername = req.body.lockername;
        let notice = req.body.notice;
        let lockerrow = req.body.lockerrow;
        let lockercol = req.body.lockercol;
        let len = lockerrow * lockercol;

        // locker_parent 에 추가 쿼리
        const sql = `INSERT INTO locker_parent (adminid, building, lockername, notice, lockerrow, lockercol) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [adminid, building, lockername, notice, lockerrow, lockercol];
        console.log(params);
        try{
            // locker_parent 에 추가 실행
            const [rows, fields] = await con.query(sql, params);
            
            // locker_child(추상) 테이블 생성 쿼리
            const sql2 ='CREATE TABLE IF NOT EXISTS userdb.' + lockername +' (lockername VARCHAR(45) NOT NULL, lockernum INT NOT NULL, canuse INT NOT NULL, exceptuse INT NOT NULL, userid INT NULL, PRIMARY KEY (lockernum), INDEX fk_'+lockername+'_user1_idx (userid ASC) VISIBLE, INDEX fk_'+lockername+'_locker_parent1_idx (lockername ASC) VISIBLE, CONSTRAINT fk_'+lockername+'_user1 FOREIGN KEY (userid) REFERENCES userdb.user (userid) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT fk_'+lockername+'_locker_parent1 FOREIGN KEY (lockername) REFERENCES userdb.locker_parent (lockername) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE = InnoDB';
            try{
                // locker_child(추상) 테이블 생성 실행
                const [rows, fields] = await con.query(sql2);
                // console.log('table is created!');

                // locker_child(추상) 에 추가 쿼리
                let sql3 = '';
                let params3 = [];
                for(let num = 1; num <= len; num++){
                    sql3 = 'INSERT INTO ' + lockername + ' (lockername, lockernum, canuse, exceptuse) VALUES (?, ?, ?, ?)';
                    let lockernumber = "locker" + num;
                    if(req.body.hasOwnProperty(lockernumber)){
                        // console.log(req.body[lockernumber]);
                        if(req.body[lockernumber] == "YES")
                            params3 = [lockername, num, 0, 1];
                        else
                            params3 = [lockername, num, 1, 0];
                    }
                    else{
                        console.log('##### lockernumber is wrong! #####');
                        break;
                    }

                    try{
                        // locker_child(추상) 에 추가 실행
                        const [rows, fields] = await con.query(sql3, params3);
                        console.log("##### " + lockernumber + " is inserted! #####");
                    }catch(error3){
                        console.log(error3);
                        throw error3;
                    }
                }
            }catch(error2){
                console.log(error2);
                throw error2;
            }
        }catch(error){
            console.log(error);
            throw error;
        }
        res.redirect('/locker');
    },
    selectLocker : async (req, res) => {
        console.log(req.session.user.id);
        let userid = req.session.user.id;
        let building = req.body.building;
        let lockername = req.body.lockername;
        let lockernum = req.body.selectedLocker;

        const sql = `UPDATE ` + lockername + ` SET canuse = ` + 0 + `, userid = ` + userid + ` WHERE lockernum = ` + lockernum;
        const sql2 = `INSERT INTO lockeruser (userid, lockername, lockernum) VALUES (?, ?, ?);`;
        const params2 = [userid, lockername, lockernum];
        try{
            const [rows, fields] = await con.query(sql);

            try{
                const [rows, fields] = await con.query(sql2, params2);

                console.log("select Locker is DONE!!!");
            }catch(error2){
                console.log(error2);
                throw error2;
            }
        }catch(error){
            console.log(error);
            throw error;
        }
        res.redirect('locker');
    },
}

module.exports = {
    get,
    process,
    rest
}