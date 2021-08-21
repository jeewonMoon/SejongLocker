let exampleModal = document.getElementById('exampleModal');
exampleModal.addEventListener('show.bs.modal', function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget
  // Extract info from data-bs-* attributes
  let recipient = button.getAttribute('data-bs-whatever');
  
  getModalInfo(recipient);
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  let modalBody = exampleModal.querySelector('.modal-body');
  
  modalBody.textContent = recipient;
})

async function getModalInfo(lockername){
    let info = '';
    let data = await axios.get(`http://localhost:3000/locker_list_for_user/getModalInfo?name=${lockername}`);
    let building = data.data.rows.building;
    let notice = data.data.rows.notice;
    let num = data.data.rows2.lockernum;
    let pwd = data.data.rows2.lockerpwd;

    info += `<h5 class="card-title">사물함 이름</h5>
    <p class="card-text">${lockername}</p>
    <h5 class="card-title">위치</h5>
    <p class="card-text">${building}</p>
    <h5 class="card-title">공지사항</h5>
    <p class="card-text">${notice}</p>
    <h5 class="card-title">사물함 번호</h5>
    <p class="card-text">${num}번</p>
    <h5 class="card-title">사물함 비밀번호</h5>
    <p class="card-text">${pwd}</p>`;

    document.getElementById('info').innerHTML = info;
}