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

async function makeTable(lockername) {
    let table = '';
    // const lockername = document.querySelector('#lockerName');
    let data = await axios.get(`http://localhost:3000/locker_list_for_admin/printLocker?name=${lockername}`);
    const rows = data.data.table;
    const col = data.data.colRow[0].lockercol;
    const row = data.data.colRow[0].lockerrow;
    let s = 1;

    console.log(rows);

    console.log(col);
    console.log(row);
    for(let i = 0; i < col; i++) {
        table += `<tr>`
          for (let j = 0; j < row; j++) {
            table += `<td id=${s}>${s}</td>`;
            s++;
        } 
        table += `</tr>`
    }
    document.getElementById('table').innerHTML = table;
    // for (let i = 0; i < rows.length; i++){
    //     let num = rows[i].lockernum;
    //     let can = rows[i].canuse;
    //     let except = rows[i].exceptuse;
    
        
    // }
}