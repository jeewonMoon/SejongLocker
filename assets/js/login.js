//user email check
document.getElementById("userEmail").addEventListener('blur', function(){
    let email = document.getElementById("userEmail").value;
    let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g]).([a][c]).([k][r])$/;

    if (!regExp.test(email)){
        document.getElementById("emailHelp1").textContent="올바른 이메일을 입력해주세요.";
        document.getElementById("emailHelp1").style.color="red";
    }
    else{
        document.getElementById("emailHelp1").textContent="We'll never share your email with anyone else.";
        document.getElementById("emailHelp1").style.color="#6c757d";
    }
  });

  //admin email check
  document.getElementById("adminEmail").addEventListener('blur', function(){
    let email = document.getElementById("adminEmail").value;
    let regExp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([s][e][j][o][n][g]).([a][c]).([k][r])$/;

    if (!regExp.test(email)){
        document.getElementById("emailHelp2").textContent="올바른 이메일을 입력해주세요.";
        document.getElementById("emailHelp2").style.color="red";
    }
    else{
        document.getElementById("emailHelp2").textContent="We'll never share your email with anyone else.";
        document.getElementById("emailHelp2").style.color="#6c757d";
    }
  });
  
  
  // 회원가입 password check
  function checkPassword(who){
      let pwLen;
      if(who == 'user'){
        pwLen = document.getElementById('userPassword1').value.length;
      }
      else if(who == 'admin'){
        pwLen = document.getElementById('adminPassword1').value.length;
      }
    
    if(1 <= pwLen && pwLen < 8){
        document.getElementById('passwordHelp1').style.color = 'red';
    }
    else if(8 <= pwLen){
        document.getElementById('passwordHelp1').style.color = 'green';
    }
    else{
        document.getElementById('passwordHelp1').style.color = 'black';
    }
  }
  
  // 회원가입 password check
  function checkPasswordAgain(who){
    let pw1, pw2;
    if(who == 'user'){
        pw1 = document.getElementById('userPassword1').value;
        pw2 = document.getElementById('userPassword2').value;
    }
    else if(who == 'admin'){
        pw1 = document.getElementById('adminPassword1').value;
        pw2 = document.getElementById('adminPassword2').value;
    }

    if(pw2.length == 0){
        document.getElementById('passwordHelp2').style.display = 'none';
        document.getElementById('passwordHelp3').style.display = 'none';
    }
    else if(pw1 == pw2){
        document.getElementById('passwordHelp2').style.display = 'inline';
        document.getElementById('passwordHelp3').style.display = 'none';
    }
    else{
        document.getElementById('passwordHelp2').style.display = 'none';
        document.getElementById('passwordHelp3').style.display = 'inline';
    }
  }
