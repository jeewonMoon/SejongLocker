const get = {
    index : (req, res) => {
        if(req.session.user){
            console.log(req.session.user);
            if(req.session.user.select === 'user')
                res.render('/index_user');
            else
                res.render('/index_admin');
        }
        else{
            console.log('하하');
            res.render('index', {title : "사물함 프로젝트"});
        }
    },
    index_for_admin : (req, res) => {
        console.log(req.body);
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        res.render('index_admin', {title:"사물함 프로젝트"});
    },
    index_for_user : (req, res) => {
        console.log(req.body);
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.    
        res.render('index_user', {title:"사물함 프로젝트"});
    },
    locker_for_admin : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        res.render('locker_for_admin', {title:"관리자 사물함"});
    },
    locker_for_user : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        res.render('locker_for_user', {title:"사용자 사물함"});
    },
    register_choice : (req, res) => {
        res.render('register_choice', {title:"회원가입"});
    },
    register_for_admin : (req, res) => {
        res.render('register_for_admin', {title:"관리자 회원가입", who : "관리자"});
    },
    register_for_user : (req, res) => {
        res.render('register_for_user', {title:"사용자 회원가입", who : "사용자"});
    },
    mypage_for_user : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        res.render('mypage_user', {title:"My Page", who : "회원"});
    },
    mypage_for_admin : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        res.render('mypage_admin', {title:"My Page", who : "관리자"});
    },
    logout : (req, res) => {
        if(req.session.user){
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

const post = {
    index : (req, res) => {
        res.render('index', {title : "사물함 프로젝트"});
    },
    login : (req, res) => {
        res.render('login', {title:"로그인", user : "사용자", admin : "관리자"});
    },
    index_for_admin : (req, res) => {
        //세션이 없는 경우 세션 발급
        let id = req.body.adminEmail;
        let password = req.body.adminPassword;
        console.log(id,password);
        if(req.session.user){
            console.log("이미 로그인 되어 있음");
            redirect('/index_for_admin');
        }
        else{
            req.session.user = {
                id : id,
                select : 'admin'
            }
            console.log("로그인 처음 됨");
            res.render('index_admin', {title:"사물함 프로젝트"});
        }
    },
    index_for_user : (req, res) => {
        let id = req.body.userEmail;
        let password = req.body.userPassword;
        console.log(id,password);
        if(req.session.user){
            console.log("이미 로그인 되어 있음");
            redirect('index_for_admin');
        }
        else{
            req.session.user = {
                id : id,
                select : 'user'
            }
            console.log("로그인 처음 됨");
            res.render('index_admin', {title:"사물함 프로젝트"});
        }
    }
};

module.exports = {
    get,
    post
}