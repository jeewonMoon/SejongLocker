const index = (req, res) => {
    res.render('index', {title : "사물함 프로젝트"});
}

const index_for_admin = (req, res) => {
    res.render('index_admin', {title:"사물함 프로젝트"});
}

const index_for_user = (req, res) => {
    res.render('index_user', {title:"사물함 프로젝트"});
}

const locker_for_admin = (req, res) => {
    res.render('locker_for_admin', {title:"관리자 사물함"});
}

const locker_for_user = (req, res) => {
    res.render('locker_for_user', {title:"사용자 사물함"});
}

const login = (req, res) => {
    res.render('login', {title:"로그인", user : "사용자", admin : "관리자"});
}

const register_choice = (req, res) => {
    res.render('register_choice', {title:"회원가입"});
}

const register_for_admin = (req, res) => {
    res.render('register_for_admin', {title:"관리자 회원가입", who : "관리자"});
}

const register_for_user = (req, res) => {
    res.render('register_for_user', {title:"사용자 회원가입", who : "사용자"});
}

const mypage_for_user = (req, res) => {
    res.render('mypage_user', {title:"My Page", who : "회원"});
}

const mypage_for_admin = (req, res) => {
    res.render('mypage_admin', {title:"My Page", who : "관리자"});
}

module.exports = {
    index,
    index_for_admin,
    index_for_user,
    locker_for_admin,
    locker_for_user,
    login,
    register_choice,
    register_for_admin,
    register_for_user,
    mypage_for_user,
    mypage_for_admin   
}