let select = ['선택 안 함', '학생(회)', '학과 동아리', '교내 동아리', '교내 직원', '기타'];
let text = '';
for (let i = 0; i < select.length; i++) {
    text += `<div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${i - 1}">
    <label class="form-check-label" for="flexRadioDefault${i - 1}">${select[i]}</label></div>`;
}
document.getElementById('form-check').innerHTML = text;