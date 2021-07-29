let i1 = 0;
let i2 = 0;
let p1 = 0;
let p2 = 0;

//user id check
document.getElementById("userId").addEventListener('blur', function () {
    let id= document.getElementById("userId").value;

    if (id == "") {
        i1 = 0;
        document.getElementById("idHelp1").textContent = "학번을 입력해주세요.";
        document.getElementById("idHelp1").style.color = "red";
    }
    else {
        i1 = 1;
        document.getElementById("idHelp1").textContent = "";
    }
});

//user password check
document.getElementById("userPassword").addEventListener('blur', function () {
    let pwd= document.getElementById("userPassword").value;

    if(pwd == "") {
        p1 = 0;
        document.getElementById("pwdHelp1").textContent = "비밀번호 입력해주세요.";
        document.getElementById("pwdHelp1").style.color = "red";
    }
    else {
        p1 = 1;
        document.getElementById("pwdHelp1").textContent = "";
    }
});

//admin id check
document.getElementById("adminId").addEventListener('blur', function () {
    let id= document.getElementById("adminId").value;

    if (id == "") {
        i2 = 0;
        document.getElementById("idHelp2").textContent = "학번을 입력해주세요.";
        document.getElementById("idHelp2").style.color = "red";
    }
    else {
        i2 = 1;
        document.getElementById("idHelp2").textContent = "";
    }
});

//admin password check
document.getElementById("adminPassword").addEventListener('blur', function () {
    let pwd= document.getElementById("adminPassword").value;

    if(pwd == "") {
        p2 = 0;
        document.getElementById("pwdHelp2").textContent = "비밀번호 입력해주세요.";
        document.getElementById("pwdHelp2").style.color = "red";
    }
    else {
        p2 = 1;
        document.getElementById("pwdHelp2").textContent = "";
    }
});

function checkInput(input){
    if(input.id == "user-login"){
        if(i1 == 1 && p1 ==1) 
            return true;
        else {
            alert("학번 또는 비밀번호를 다시 입력해 주세요.");
            return false;
        }
    }
    else if(input.id == "admin-login"){
        if(i2 == 1 && p2 == 1) 
            return true;
        else {
            alert("학번 또는 비밀번호를 다시 입력해 주세요.");
            return false;
        }
    }
}