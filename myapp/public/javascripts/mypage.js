function cancelReservation(){
    document.getElementById("reservationCard").style.display = 'none';
    document.getElementById("cancelBtn").style.display = 'none';
    document.getElementById("reserveBtn").style.display = 'inline-block';
}

async function deleteLockerUser(userid, lockername, lockernum){
    let flag = confirm('정말 취소 하실 건가요?');

    if(flag){
        let data = await axios.get(`http://localhost:3000/locker_list_for_user/deleteLockerUser?userid=${userid}&lockername=${lockername}&lockernum=${lockernum}`);

        if(!data.data.flag){
            window.location.href = 'http://localhost:3000/locker_list_for_user';
        }
    }
}