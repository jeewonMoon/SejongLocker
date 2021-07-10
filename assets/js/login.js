function CheckEmail(){
    let email = document.getElementsByClassName('email').value;
    let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g])*.([a][c])*.([k][r])$/
    
    if (!regExp.test(email)){
        alert("이메일을 확인해주세요.");
        //document.getElementsByClassName('email').innerHTML("올바른 이메일을 입력해주세요.");
    }else{
        
    }
}