let radio;

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


// 학번에 입력될 때 마다 초기화
function registerIdReset(){
  document.getElementById('registerIdHelp1').style.display = 'none';
  document.getElementById('registerIdHelp2').style.display = 'none';
}

// email에 입력될 때 마다 초기화
function registerEmailReset(){
  document.getElementById('registerEmailHelp1').style.display = 'none';
  document.getElementById('registerEmailHelp2').style.display = 'none';
}

// 회원가입 버튼 클릭 시
function checkForm(){
  if(document.getElementById('registerId').value == "")  {
    alert('학번을 입력해주세요.');
    document.getElementById('registerId').focus();
    return false;
  }
  else if(document.getElementById('registerIdHelp1').style.display == 'none')  {
    alert('학번 중복 확인해주세요.');
    document.getElementById('idCheckBtn1').focus();
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
  else if(document.getElementById('registerEmailHelp1').style.display == 'none')  {
    alert('이메일 중복 확인해주세요.');
    document.getElementById('emailCheckBtn1').focus();
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

//radio value값 가져오기
function getValue(event){
  return radio = event.target.value;
}
 
// id중복체크
async function idCheck(){
  if (radio==='사용자'){
    const userid = document.querySelector('#registerId');
    let data = await axios.get(`http://localhost:3000/register/userIdcheck?id=${userid.value}`);
    
    console.log(data);

    let login_flag = data.data.login;

    if(login_flag){
      alert('사용 가능한 학번입니다.');
      document.getElementById('registerIdHelp1').style.display = 'inline';
      document.getElementById('registerIdHelp2').style.display = 'none';
    }else{
      alert('사용이 불가한 학번입니다.');
      document.getElementById('registerIdHelp1').style.display = 'none';
      document.getElementById('registerIdHelp2').style.display = 'inline';
    }

  }else if (radio==='관리자'){
    const adminid = document.querySelector('#registerId');
    let data = await axios.get(`http://localhost:3000/register/adminIdcheck?id=${adminid.value}`);

    console.log(data);

    login_flag = data.data.login;
    if(login_flag){
      alert('사용 가능한 학번입니다.');
      document.getElementById('registerIdHelp1').style.display = 'inline';
      document.getElementById('registerIdHelp2').style.display = 'none';
    }else{
      alert('사용이 불가한 학번입니다.');
      document.getElementById('registerIdHelp1').style.display = 'none';
      document.getElementById('registerIdHelp2').style.display = 'inline';
    }
  }else{
    alert('사용자 또는 관리자를 선택해주세요.');
  }
}

// email중복체크
async function emailCheck(){
  if (radio==='사용자'){
    const userEmail = document.querySelector('#registerEmail');
    let data = await axios.get(`http://localhost:3000/register/userEmailcheck?email=${userEmail.value}`);

    console.log(data);

    let login_flag = data.data.login;

    if(login_flag){
      alert('사용 가능한 이메일입니다.');
      document.getElementById('registerEmailHelp1').style.display = 'inline';
      document.getElementById('registerEmailHelp2').style.display = 'none';
    }else{
      alert('사용이 불가한 이메일입니다.');
      document.getElementById('registerEmailHelp1').style.display = 'none';
      document.getElementById('registerEmailHelp2').style.display = 'inline';
    }

  }else if (radio==='관리자'){
    const adminEmail = document.querySelector('#registerEmail');
    let data = await axios.get(`http://localhost:3000/register/adminEmailcheck?email=${adminEmail.value}`);

    console.log(data);

    login_flag = data.data.login;
    if(login_flag){
      alert('사용 가능한 이메일입니다.');
      document.getElementById('registerEmailHelp1').style.display = 'inline';
      document.getElementById('registerEmailHelp2').style.display = 'none';
    }else{
      alert('사용이 불가한 이메일입니다.');
      document.getElementById('registerEmailHelp1').style.display = 'none';
      document.getElementById('registerEmailHelp2').style.display = 'inline';
    }
  }else{
    alert('사용자 또는 관리자를 선택해주세요.');
  }
}


// email 인증하기
async function authEmail(){
  const email = document.querySelector('#registerEmail');
  let data = await axios.get(`http://localhost:3000/register/authEmail?authEmail=${email.value}`);

  let authNum = data.data.authNum;
  let authEmail = data.data.authEmail;
  // 브라우저 - 개발자 도구에서 확인
  console.log("###인증 이메일 : " + authEmail + " ###인증 번호 : " + authNum);
}