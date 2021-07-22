let text = '';
let words = ['회원님', '사물함 생성', '사물함 관리', '대기열 확인', '회원정보 수정'];
for (let i = 0; i < words.length; i++) {
    if (i == 0) {
        text += `<li><a class="dropdown-item" href="#"><b>${words[i]}</b></a></li>`
    }
    else {
        text += `<li><a class="dropdown-item" href="#">${words[i]}</a></li>`;
    }
}
document.getElementById('dropdown').innerHTML = text;