function CheckEmail(){
    let address = document.getElementsByClassName("email1").value;
    //let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g]).([a][c]).([k][r])$/;
    let regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!regExp.test(address)){
        alert("이메일을 확인해주세요.");
        //document.getElementsByClassName('email1').innerHTML("올바른 이메일을 입력해주세요.");
    }else{
        alert("correct");
    }
}