let text2 = '';
let words2 = ['Home', "Locker"]
let link = ['/', '/locker'];
for (let i = 0; i < words2.length; i++) {
    text2 += `<li class="nav-item">
    <a class="nav-link text-light" href="${link[i]}" style="text-align: right;">${words2[i]} 
    </a></li>`;
}
document.getElementById("nav-items").innerHTML = text2;