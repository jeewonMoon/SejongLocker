let exampleModal = document.getElementById('exampleModal');
exampleModal.addEventListener('show.bs.modal', function (event) {
// Button that triggered the modal
let button = event.relatedTarget
// Extract info from data-bs-* attributes
let recipient = button.getAttribute('data-bs-whatever');
let modalTitle = exampleModal.querySelector('.modal-title');
modalTitle.textContent = recipient;
makeTable(modalTitle.textContent);
// If necessary, you could initiate an AJAX request here
// and then do the updating in a callback.
//
// Update the modal's content.
let modalBody = exampleModal.querySelector('.modal-body');

modalBody.value = recipient;
})


// 사물함 출력
async function makeTable(lockername) {
    let table = '';
    let data = await axios.get(`http://localhost:3000/locker_list_for_admin/printLocker?name=${lockername}`);
    const rows = data.data.table;
    const col = data.data.colRow[0].lockercol;
    const row = data.data.colRow[0].lockerrow;
    let start = 0;
    
    for(let i = 0; i < row; i++) {
        table += `<tr>`
          for (let j = 0; j < col; j++) {
            if(data.data.table[start].exceptuse == 1){
                table += `<td class="table-secondary" id="${data.data.table[start].lockernum}" onclick="changeColor(${data.data.table[start].lockernum})"><input type="hidden" id="locker${data.data.table[start].lockernum}" value="${data.data.table[start].lockernum}">${data.data.table[start].lockernum}</td>`;
            }
            else if(data.data.table[start].userid != null){
                table += `<td class="table-success" id="${data.data.table[start].lockernum}" onclick="changeColor(${data.data.table[start].lockernum})"><input type="hidden" id="locker${data.data.table[start].lockernum}" value="${data.data.table[start].lockernum}">${data.data.table[start].lockernum}</td>`;
            }
            else{
                table += `<td class="table-primary" id="${data.data.table[start].lockernum}" onclick="changeColor(${data.data.table[start].lockernum})"><input type="hidden" id="locker${data.data.table[start].lockernum}" value="${data.data.table[start].lockernum}">${data.data.table[start].lockernum}</td>`;
            }
            start++;
        } 
        table += `</tr>`
    }
    document.getElementById('adminTable').innerHTML = table;

    // 변경 전 공지사항 출력
    document.getElementById('noticeChange').innerHTML = data.data.colRow[0].notice;
}


// 사물함 공지사항 입력될 때마다 리셋
function resetNotice(){
    document.getElementById('noticechangeHelp1').style.display = 'inline';
    document.getElementById('noticechangeHelp2').style.display = 'none';
}


// 사물함 공지사항 바꾸기
async function changeNotice(){
    let targetNotice = document.getElementById('noticeChange').value;
    let targetLockerName = document.getElementById('lockerName').textContent;
    let data = await axios.get(`http://localhost:3000/locker_list_for_admin/changeNotice?lockername=${targetLockerName}&notice=${targetNotice}`);
    
    if(data.data.result == true){
        document.getElementById('noticechangeHelp1').style.display = 'none';
        document.getElementById('noticechangeHelp2').style.display = 'inline';
    }else{
        alert("공지사항 변경이 미완료 되었습니다.\n다시 시도해주세요.")
        document.getElementById('noticechangeHelp1').style.display = 'inline';
        document.getElementById('noticechangeHelp2').style.display = 'none';
    }
}


// 사물함 선택하기
function changeColor(id) {
    let num = document.getElementById(id);
    let targetLocker = document.getElementById("locker"+id);

    // console.log("before " + num.className);
    if(num.className.slice(num.className.length-7, num.className.length) == "warning"){
        num.className = num.className.slice(0, num.className.length-14);
        targetLocker.value = id;
    }else{
        num.className += " table-warning";
        targetLocker.value = "CHANGE"
    }
    // console.log("after " + num.className);
}


// 사물함 상태 사용 가능으로 변경
async function changeLockerYES(){
    let flag = confirm('정말 변경 하실 건가요?');
    
    if(flag){
        let targetLockerName = document.getElementById('lockerName').textContent;
        
        let data3 = await axios.get(`http://localhost:3000/locker_list_for_admin/getLockerNum?lockername=${targetLockerName}`);

        let total = data3.data.row * data3.data.col;

        for(let i = 1; i <= total; i++){
            let targetLocker = document.getElementById("locker"+i);

            if(targetLocker.value == "CHANGE"){
                let data2 = await axios.get(`http://localhost:3000/locker_list_for_admin/changeLockerState?lockername=${targetLockerName}&lockernum=${i}&state=useYes`);

                if(data2.data.result)
                    console.log(i + " LockerState Change Success");
            }
        }

        // 테이블 다시 그리기
        let table = '';
        let data = await axios.get(`http://localhost:3000/locker_list_for_admin/printLocker?name=${targetLockerName}`);
        const rowsTable = data.data.table;
        const col = data.data.colRow[0].lockercol;
        const row = data.data.colRow[0].lockerrow;
        let start = 0;
        
        for(let i = 0; i < row; i++) {
            table += `<tr>`
              for (let j = 0; j < col; j++) {
                if(rowsTable[start].exceptuse == 1){
                    table += `<td class="table-secondary" id="${rowsTable[start].lockernum}" onclick="changeColor(${rowsTable[start].lockernum})"><input type="hidden" id="locker${rowsTable[start].lockernum}" value="${rowsTable[start].lockernum}">${rowsTable[start].lockernum}</td>`;
                }
                else if(rowsTable[start].userid != null){
                    table += `<td class="table-success" id="${rowsTable[start].lockernum}" onclick="changeColor(${rowsTable[start].lockernum})"><input type="hidden" id="locker${rowsTable[start].lockernum}" value="${rowsTable[start].lockernum}">${rowsTable[start].lockernum}</td>`;
                }
                else{
                    table += `<td class="table-primary" id="${rowsTable[start].lockernum}" onclick="changeColor(${rowsTable[start].lockernum})"><input type="hidden" id="locker${rowsTable[start].lockernum}" value="${rowsTable[start].lockernum}">${rowsTable[start].lockernum}</td>`;
                }
                start++;
            } 
            table += `</tr>`
        }
        document.getElementById('adminTable').innerHTML = table;


    }
}

// 사물함 상태 사용 불가능으로 변경
async function changeLockerNO(){
    let flag = confirm('정말 변경 하실 건가요?');
    
    if(flag){
        let targetLockerName = document.getElementById('lockerName').textContent;
        
        let data3 = await axios.get(`http://localhost:3000/locker_list_for_admin/getLockerNum?lockername=${targetLockerName}`);

        let total = data3.data.row * data3.data.col;

        for(let i = 1; i <= total; i++){
            let targetLocker = document.getElementById("locker"+i);
            if(targetLocker.value == "CHANGE"){
                let data2 = await axios.get(`http://localhost:3000/locker_list_for_admin/changeLockerState?lockername=${targetLockerName}&lockernum=${i}&state=useNo`);

                if(data2.data.result)
                    console.log(i + " LockerState Change Success");
            }
        }

        // 테이블 다시 그리기
        let table = '';
        let data = await axios.get(`http://localhost:3000/locker_list_for_admin/printLocker?name=${targetLockerName}`);
        const rowsTable = data.data.table;
        const col = data.data.colRow[0].lockercol;
        const row = data.data.colRow[0].lockerrow;
        let start = 0;
        
        for(let i = 0; i < row; i++) {
            table += `<tr>`
              for (let j = 0; j < col; j++) {
                if(rowsTable[start].exceptuse == 1){
                    table += `<td class="table-secondary" id="${rowsTable[start].lockernum}" onclick="changeColor(${rowsTable[start].lockernum})"><input type="hidden" id="locker${rowsTable[start].lockernum}" value="${rowsTable[start].lockernum}">${rowsTable[start].lockernum}</td>`;
                }
                else if(rowsTable[start].userid != null){
                    table += `<td class="table-success" id="${rowsTable[start].lockernum}" onclick="changeColor(${rowsTable[start].lockernum})"><input type="hidden" id="locker${rowsTable[start].lockernum}" value="${rowsTable[start].lockernum}">${rowsTable[start].lockernum}</td>`;
                }
                else{
                    table += `<td class="table-primary" id="${rowsTable[start].lockernum}" onclick="changeColor(${rowsTable[start].lockernum})"><input type="hidden" id="locker${rowsTable[start].lockernum}" value="${rowsTable[start].lockernum}">${rowsTable[start].lockernum}</td>`;
                }
                start++;
            } 
            table += `</tr>`
        }
        document.getElementById('adminTable').innerHTML = table;
    }
}


// 사물함 삭제
async function deleteLocker(){
    let flag = confirm('정말 삭제 하실 건가요?');

    if(flag){
        let targetLockerName = document.getElementById('lockerName').textContent;

        let data = await axios.get(`http://localhost:3000/locker_list_for_admin/deleteLocker?lockername=${targetLockerName}`);

        if(data.data.flag){
            console.log("deleteLocker is success");
            window.location.href = 'http://localhost:3000/locker_list_for_admin';
        }
    }
}