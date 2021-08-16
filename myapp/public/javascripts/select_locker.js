// 사용자 사물함 신청 → 사물함 건물 선택 시
async function showLockerName(buildingName){
    let lockernames = "";
    
    if(buildingName == ""){
        lockernames += `<option selected>먼저 사물함 건물을 선택해주세요.</option>`;
    }
    else{
        try{
            let data = await axios.get(`http://localhost:3000/locker/showLockerName?building=${buildingName}`);
            
            console.log(data);
    
            let result = data.data.result;
            if(result.length > 0){
                lockernames += `<option value="" selected>사물함 선택</option>`
                for(let i = 0; i < result.length; i++){
                    lockernames += `<option value="${result[i].lockername}">${result[i].lockername}</option>`;
                }
            }
            else{
                lockernames += `<option value="" selected>없음</option>`;
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    document.getElementById("lockername").innerHTML = lockernames;
}

// 사용자 사물함 신청 → 사물함 건물 다시 선택 시
function rechange(){
    let notice = "";
    
    notice += `<h5 class="card-title">사물함 공지사항</h5>
            <p class="card-text mb-2 text-muted">사물함을 선택해주세요</p>`;
    
    document.getElementById("noticeName").innerHTML = notice;
}

// 사용자 사물함 신청 → (사물함 건물 선택 후) 사물함 선택 시
async function showLockerNotice(lockername){
    let buildingName = document.getElementById('building').value;
    let notice = "";

    if(lockername == "" || lockername == "없음"){
        notice += `<h5 class="card-title">사물함 공지사항</h5>
            <p class="card-text mb-2 text-muted">사물함을 선택해주세요</p>`;
    }
    else{
        try{
            let data = await axios.get(`http://localhost:3000/locker/showLockerNotice?building=${buildingName}&lockername=${lockername}`);

            console.log(data);
    
            let result = data.data.result;
            if(result.length > 0){
                notice += `<h5 class="card-title">${lockername} 사물함 공지사항</h5>
                    <p class="card-text mb-2 text-muted">${result}</p>`;
            }
            else{
                notice += `<h5 class="card-title">${lockername} 사물함 공지사항</h5>
                    <p class="card-text mb-2 text-muted">없음</p>`;
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    document.getElementById("noticeName").innerHTML = notice;
}