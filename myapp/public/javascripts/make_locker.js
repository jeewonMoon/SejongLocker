function makeLocker() {
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    let table = '';
    let start = 1;
    for(let i=0;i<height;i++){
        table += '<tr>';
        for(let j=0;j<width;j++){
            table += `<td class="table-primary" id=${start} onclick=blockLocker(${start})>${start}</td>`;
            start += 1;
        }
        table += '</tr>';
    }
    
    document.getElementById('table').innerHTML = table;
}

function blockLocker(id){
    let num = document.getElementById(id);
    if(num.className == "table-primary"){
        num.className = "table-secondary";
    }
    else{
        num.className = "table-primary";
    }

    /*
    if(num.style.backgroundColor == "CF2EFF"){
        num.style.backgroundColor = "secondary";
    }
    else{
        num.style.backgroundColor = "primary";
    }*/
}