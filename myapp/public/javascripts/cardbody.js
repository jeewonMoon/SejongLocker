let text = '';
let words_key = ['이름', '이메일', '학번'];
let words_values = ['OYR', 'OYR@sejong.ac.kr', '210717'];
for(let i=0;i<words_key.length;i++){
    text += `<h5 class="card-title">${words_key[i]}</h5><p class="card-text">${words_values[i]}</p>`;
}
document.getElementById('card-body').innerHTML = text;