// document.getElementById('make-locker').addEventListener('click', function () {
//     let height = document.getElementById("height").value;
//     let width = document.getElementById("width").value;
//     let table = '';
//     let start = 1;
//     for (let i = 0; i < height; i++) {
//         table += '<tr>';
//         for (let j = 0; j < width; j++) {
//             // table += `<td class="table-primary" id="${start}" onclick="blockLocker(${start})">${start}</td>`;
//             table += `<td class="table-primary" id="${start}" onclick="blockLocker(${start})">${start}<input type="hidden" name="locker${start}" id="locker${start}" value="${start}"></td>`;
//             start += 1;
//         }
//         table += '</tr>';
//     }
//     document.getElementById('table').innerHTML = table;
// });

// 사물함 만드는 함수
function makeLocker(){
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    let table = '';
    let start = 1;
    for (let i = 0; i < height; i++) {
        table += '<tr>';
        for (let j = 0; j < width; j++) {
            // table += `<td class="table-primary" id="${start}" onclick="blockLocker(${start})">${start}</td>`;
            table += `<td class="table-primary" id="${start}" onclick="blockLocker(${start})">${start}<input type="hidden" name="locker${start}" id="locker${start}" value="${start}"></td>`;
            start += 1;
        }
        table += '</tr>';
    }
    document.getElementById('table').innerHTML = table;
}


// 사물함 생성 후 회색처리하는 함수
function blockLocker(id) {
    let num = document.getElementById(id);
    let exceptuse = document.getElementById("locker"+id);
    if (num.className == "table-primary") {
        num.className = "table-secondary";
        exceptuse.value = "YES";
    }
    else {
        num.className = "table-primary";
        exceptuse.value = id;
    }
}


// lockername 중복체크
async function lockerNameCheck(){
    const lockername = document.querySelector('#locker-name');
    try{
        let data = await axios.get(`http://localhost:3000/locker/lockernameCheck?lockername=${lockername.value}`);
        
        console.log(data);

        let checkResult = data.data.result;
        if(checkResult){
            alert('사용 가능한 사물함 이름입니다.');
            document.getElementById('lockernameHelp1').style.display = 'inline';
            document.getElementById('lockernameHelp2').style.display = 'none';
        }else{
            alert('사용이 불가한 사물함 이름입니다.');
            document.getElementById('lockernameHelp1').style.display = 'none';
            document.getElementById('lockernameHelp2').style.display = 'inline';
        }
    }catch(error){
        console.log(error);
    }   
}

// lockername에 입력될 때 마다 초기화
function lockernameReset(){
    document.getElementById('lockernameHelp1').style.display = 'none';
    document.getElementById('lockernameHelp2').style.display = 'none';
}

// 사물함 row, col에 입력될 때 마다 실행
function lockermakeReset(){
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    if(height == '' || width == ''){
        document.getElementById('make-lockerHelp').style.display = 'none';
        document.getElementById('table').innerHTML = '';
    }
    else{
        document.getElementById('make-lockerHelp').style.display = 'inline';
        makeLocker();
    }
}


// 사물함 생성 버튼 check
// function showHelp(){
//     let row = document.getElementById('height').value;
//     let col = document.getElementById('width').value;

//     if(row == '' || col == '')
//         alert('사물함 높이와 갯수를 다시 입력해주세요');
//     else{
//         document.getElementById('make-lockerHelp').style.display = 'inline';
//         makeLocker();
//     }
// }


// locker 만드는 폼이 완성되었는 지 검사
function lockerAdminCheck(){
    if(document.getElementById('select-place').value == "")  {
        alert('사물함 건물을 선택해주세요.');
        document.getElementById('select-place').focus();
        return false;
    }
    else if(document.getElementById('locker-name').value == '')  {
        alert('사물함 이름을 입력해주세요.');
        document.getElementById('locker-name').focus();
        return false;
    }
    else if(document.getElementById('lockernameHelp1').style.display == 'none')  {
        alert('사물함 이름 중복 확인해주세요.');
        document.getElementById('lockernameCheck').focus();
        return false;
    }
    else if(document.getElementById('height').value == '')  {
        alert('사물함 높이를 입력해주세요.');
        document.getElementById('height').focus();
        return false;
    }
    else if(document.getElementById('width').value == '')  {
        alert('한 층의 사물함 갯수를 입력해주세요.');
        document.getElementById('width').focus();
        return false;
    }
    else if(document.getElementById('make-lockerHelp').style.display == 'none')  {
        alert('사물함 생성 버튼을 클릭해주세요.');
        document.getElementById('make-locker').focus();
        return false;
    }
    return true;
}