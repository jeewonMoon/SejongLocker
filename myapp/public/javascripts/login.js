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
  