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
    
    for(let i = 0; i < col; i++) {
        table += `<tr>`
          for (let j = 0; j < row; j++) {
            if(data.data.table[start].exceptuse == 1){
                table += `<td class="table-secondary" id="${data.data.table[start].lockernum}">${data.data.table[start].lockernum}</td>`;
            }
            else if(data.data.table[start].userid != null){
                table += `<td class="table-success" id="${data.data.table[start].lockernum}">${data.data.table[start].lockernum}</td>`;
            }
            else{
                table += `<td class="table-primary" id="${data.data.table[start].lockernum}">${data.data.table[start].lockernum}</td>`;
            }
            start++;
        } 
        table += `</tr>`
    }
    document.getElementById('adminTable').innerHTML = table;
}