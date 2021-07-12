function CheckUserEmail(){
    let email = document.getElementById("userEmail").value;
    let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g]).([a][c]).([k][r])$/;

    if (!regExp.test(email)){
        //alert("이메일을 확인해주세요.");
        document.getElementById("emailHelp1").innerHTML("<div 'style=color:red'>올바른 이메일을 입력해주세요.</div>");
    }
}

function CheckAdminEmail(){
    let email = document.getElementById("adminEmail").value;
    let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g]).([a][c]).([k][r])$/;

    if (!regExp.test(email)){
        //alert("이메일을 확인해주세요.");
        document.getElementById("adminEmail2").innerHTML("올바른 이메일을 입력해주세요.");
    }
}