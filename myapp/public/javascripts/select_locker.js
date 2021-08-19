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
    document.getElementById("tableInfo").style.display = 'none';
    document.getElementById("selectedLocker").value = 0;
    let notice = "";
    
    notice += `<h5 class="card-title">사물함 공지사항</h5>
            <p class="card-text mb-2 text-muted">사물함을 선택해주세요</p>`;
    
    document.getElementById("noticeName").innerHTML = notice;
}


// 사물함 신청 완료 버튼 클릭 → 제대로 입력했는지 검증
function lockerUserCheck(){
    if(document.getElementById('building').value == "")  {
        alert('사물함 건물 위치를 선택해주세요.');
        document.getElementById('building').focus();
        return false;
    }
    else if(document.getElementById('lockername').value == '')  {
        alert('사물함 이름을 선택해주세요.');
        document.getElementById('lockername').focus();
        return false;
    }
    else if(document.getElementById("selectedLocker").value == 0){
        alert('원하시는 위치의 사물함을 선택해주세요')
        return false;
    }
    return true;
}


// 사물함 신청 → 사물함 표 보인 후 노랑(선택됨)으로 만들기
function wantLocker(id, lockerrow, lockercol) {
    let num = document.getElementById(id);

    for(let i = 1; i <= lockerrow * lockercol; i++){
        if(document.getElementById(i).className == "table-warning"){
            document.getElementById(i).className = "table-primary";
        }
    }
    num.className = "table-warning";
    document.getElementById("selectedLocker").value = id;
}


// 사용자 사물함 신청 → (사물함 건물 선택 후) 사물함 선택 시
async function showLockerNotice(lockername){
    document.getElementById("selectedLocker").value = 0;
    let buildingName = document.getElementById('building').value;
    let notice = "";

    if(lockername == "" || lockername == "없음"){
        document.getElementById("tableInfo").style.display = 'none';
        
        notice += `<h5 class="card-title">사물함 공지사항</h5>
            <p class="card-text mb-2 text-muted">사물함을 선택해주세요</p>`;
        
            document.getElementById('userTable').innerHTML = "";
    }
    else{
        document.getElementById("tableInfo").style.display = 'inline';
        try{
            // 사물함 공지사항
            let data = await axios.get(`http://localhost:3000/locker/showLockerNotice?building=${buildingName}&lockername=${lockername}`);

            let lockerrow = data.data.lockerrow;
            let lockercol = data.data.lockercol;
            
            if(notice.length > 0){
                notice += `<h5 class="card-title">${lockername} 사물함 공지사항</h5>
                    <p class="card-text mb-2 text-muted">${notice}</p>`;
            }
            else{
                notice += `<h5 class="card-title">${lockername} 사물함 공지사항</h5>
                    <p class="card-text mb-2 text-muted">없음</p>`;
            }

            // lockernum, canuse, exceptuse, userid 속성 사용 가능
            
            let table = '';
            let start = 0;
            for (let i = 0; i < lockercol; i++) {
                table += '<tr>';
                for (let j = 0; j < lockerrow; j++) {
                    if(data.data.lockers[start].exceptuse == 1){
                        table += `<td class="table-secondary" id="${data.data.lockers[start].lockernum}"><input type="hidden" id="locker${data.data.lockers[start].lockernum}">${data.data.lockers[start].lockernum}</td>`;
                    }
                    else if(data.data.lockers[start].userid != null){
                        table += `<td class="table-success" id="${data.data.lockers[start].lockernum}"><input type="hidden" id="locker${data.data.lockers[start].lockernum}">${data.data.lockers[start].lockernum}</td>`;
                    }
                    else{
                        table += `<td class="table-primary" id="${data.data.lockers[start].lockernum}" onclick="wantLocker(${data.data.lockers[start].lockernum}, ${lockerrow}, ${lockercol})"><input type="hidden" id="locker${data.data.lockers[start].lockernum}">${data.data.lockers[start].lockernum}</td>`;
                    }
                    start += 1;
                }
                table += '</tr>';
            }
            document.getElementById('userTable').innerHTML = table;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    document.getElementById("noticeName").innerHTML = notice;
}