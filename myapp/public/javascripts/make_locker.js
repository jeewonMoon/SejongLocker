document.getElementById('make-locker').addEventListener('click', function () {
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
});

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

// email에 입력될 때 마다 초기화
function lockernameReset(){
    document.getElementById('lockernameHelp1').style.display = 'none';
    document.getElementById('lockernameHelp2').style.display = 'none';
  }
