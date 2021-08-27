function cancelReservation(){
    document.getElementById("reservationCard").style.display = 'none';
    document.getElementById("cancelBtn").style.display = 'none';
    document.getElementById("reserveBtn").style.display = 'inline-block';
}

async function updatePhonenum(){
    let num = document.querySelector('#phonenum').value;
    if (num === ''){
        alert('연락처를 입력해주세요.');
    }
    else{
        let data = await axios.get(`/mypage/updatePhonenum?phonenum=${num}`);
    
        if(!data.data.flag){
            alert('연락처를 변경했습니다.');
            window.location.href = '/mypage';
        }
        
    }
}

async function updateTeam(){
    let team = document.querySelector('#team').value;
    if (team === ''){
        alert('소속을 입력해주세요.');
    }
    else {
        let data = await axios.get(`/mypage/updateTeam?team=${team}`);
        
        if(!data.data.flag){
            alert('소속을 변경했습니다.');
            window.location.href = '/mypage';
        }
    }
}