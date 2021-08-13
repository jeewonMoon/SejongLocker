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
    
   /* id를 추후에도 사용할 것이라 판단되어, this를 사용한 방법은 잠시 보류하겠습니다.
    if (id.className == "table-primary") {
        id.className = "table-secondary";
    }
    else {
        id.className = "table-primary";
    }
    */
}