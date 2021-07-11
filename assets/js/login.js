function CheckUserEmail(){
    let email = document.getElementsByClassName("user-email").value;
    //let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g]).([a][c]).([k][r])$/;
    let regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!regex.test(email)){
        alert("이메일을 확인해주세요.");
        //document.getElementsByClassName("user-email").innerHTML("올바른 이메일을 입력해주세요.");
    }else{
        alert("correct");   //for test
    }
}

function CheckAdminEmail(){
    let email = document.getElementsByClassName("admin-email").value;
    //let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g]).([a][c]).([k][r])$/;
    let regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!regex.test(email)){
        alert("이메일을 확인해주세요.");
        //document.getElementsByClassName("user-email").innerHTML("올바른 이메일을 입력해주세요.");
    }else{
        alert("correct");
    }
}