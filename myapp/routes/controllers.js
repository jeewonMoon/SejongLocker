const get = {
    index : (req, res) => {
        if(req.session.user){
            console.log(req.session.user);
            if(req.session.user.select === 'user')
                res.redirect('/index_user');
            else
                res.redirect('/index_admin');
        }
        else{
            res.render('index');
        }
    },
    index_for_admin : (req, res) => {
        console.log(req.body);
        if(req.session.user.select === 'admin'){
            res.render('index_admin');
        }
        else{
            res.redirect('/');
        }
    },
    index_for_user : (req, res) => {
        console.log(req.body);
        if(req.session.user.select === 'user'){
            res.render('index_user');
        }
        else{
            res.redirect('/');
        }
    },
    //redirect -> url로 이동시킴, render -> 템플릿 출력
    locker_for_admin : (req, res) => {
        if(!(req.session.user)){
            res.redirect('/');
        }
        else{
            if(req.session.user.select === 'admin'){
                res.render('locker_for_admin');
            }
            else{
                res.redirect('/');
            }
        }
    },
    locker_for_user : (req, res) => {
        if(!(req.session.user)){
            res.redirect('/');
        }
        else if(req.session.user.select === 'user'){
            res.render('locker_for_user');
        }

        else if(req.session.user.select === 'admin'){
            res.redirect('/');
        }
    },
    register_choice : (req, res) => {
        res.render('register_choice');
    },
    register_for_admin : (req, res) => {
        res.render('register_for_admin');
    },
    register_for_user : (req, res) => {
        res.render('register_for_user');
    },
    mypage_for_user : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        if(!(req.session.user)){
            res.redirect('/');
        }
        else if(req.session.user.select === 'user'){
            res.render('mypage_for_user');
        }
        else if(req.session.user.select === 'admin'){
            res.redirect('/');
        }
    },
    mypage_for_admin : (req, res) => {
        //세션이 없는 경우 인덱스 혹은 로그인 페이지로 돌려보내게 할 것입니다.
        if(!(req.session.user)){
            res.redirect('/');
        }
        else if(req.session.user.select === 'admin'){
            res.render('mypage_for_admin');
        }
        else if(req.session.user.select === 'user'){
            res.redirect('/');
        }
    },
    login : (req, res) => {
        res.render('login');
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

//여기부터 post
const post = {
    index : (req, res) => {
        res.render('index');
    },
    login : (req, res) => {
        res.render('login');
    },
    index_for_admin : (req, res) => {
        //세션이 없는 경우 세션 발급
        let id = req.body.adminId;
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
            res.render('index_admin');
        }
    },
    index_for_user : (req, res) => {
        let id = req.body.userId;
        let password = req.body.userPassword;
        console.log(id,password);
        if(req.session.user){
            console.log("이미 로그인 되어 있음");
            redirect('/index_for_admin');
        }
        else{
            req.session.user = {
                id : id,
                select : 'user'
            }
            req.session.save(function(){
                res.render('index_admin');
            })
        }
    }
};

module.exports = {
    get,
    post
}