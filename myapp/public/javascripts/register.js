// 회원가입 password check (user, admin)
function checkPassword(){
  let pwLen = document.getElementById('password1').value.length;;
  
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

// 회원가입 password check (user, admin)
function checkPasswordAgain(){
  let pw1 = document.getElementById('password1').value;
  let pw2 = document.getElementById('password2').value;

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

// 회원가입 버튼 클릭 시
function checkForm(){
  if(document.getElementById('registerId').value == "")  {
    alert('학번을 입력해주세요.');
    document.getElementById('registerId').focus();
    return false;
  }
  else if(document.getElementById('registerName').value == "")  {
    alert('이름을 입력해주세요.');
    document.getElementById('registerName').focus();
    return false;
  }
  else if(document.getElementById('registerEmail').value == "")  {
    alert('이메일을 입력해주세요.');
    document.getElementById('registerEmail').focus();
    return false;
  }
  else if(document.getElementById('registerPhone').value == "")  {
    alert('전화번호를 입력해주세요.');
    document.getElementById('registerPhone').focus();
    return false;
  }
  else if(document.getElementById('password1').value == "")  {
    alert('비밀번호를 입력해주세요.');
    document.getElementById('password1').focus();
    return false;
  }
  else if(document.getElementById('passwordHelp1').style.color == 'red')  {
    alert('비밀번호를 8자리 이상 입력해주세요.');
    document.getElementById('password1').focus();
    return false;
  }
  else if(document.getElementById('password2').value == "")  {
    alert('비밀번호 확인을 입력해주세요.');
    document.getElementById('password2').focus();
    return false;
  }  
  else if(document.getElementById('passwordHelp2').style.display == 'none')  {
    alert('비밀번호를 동일하게 입력해주세요.');
    document.getElementById('password2').focus();
    return false;
  }
  else if(document.getElementById('registerTeam').value == "")  {
    alert('소속을 입력해주세요.');
    document.getElementById('password2').focus();
    return false;
  }
  return true;
}


function cbTeam(myTeam) {
  if(myTeam.checked == true){
    const checkboxes = document.getElementsByName("cbTeams");
  
    checkboxes.forEach((cb) => {
        cb.checked = false;
    });
  
    myTeam.checked = true;
  }
}