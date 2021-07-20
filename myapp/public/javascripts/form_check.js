let select = ['교수', '회장', '학생', '기타'];
let text = '';
for (let i = 0; i < select.length; i++) {
    text += `<div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault${i - 1}">
    <label class="form-check-label" for="flexRadioDefault${i - 1}">${select[i]}</label></div>`;
}
document.getElementById('form-check').innerHTML = text;