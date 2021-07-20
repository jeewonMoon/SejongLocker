document.getElementById("select-place").addEventListener("change", function(){
    let showLocker = document.getElementById('select-place').value;
    let places;
    let locker_name = "";

    if(showLocker == "사물함 건물 위치 선택"){
        places = ['먼저 사물함 건물을 선택해주세요.'];
        locker_name += `<option selected>${places[0]}</option>`;
    }
    else{
        places = ['사물함 선택', '위의 사물함 건물 기준으로 DB를 검색하여', '관리자가 해당 사물함 건물에 등록한 사물함을 보여줌', '예를 들어', '컴퓨터공학과 사물함1', '컴퓨터공학과 사물함2', '소프트웨어학과 사물함1'];
        locker_name = "";
        for (let i = 0; i < places.length; i++) {
            if (i == 0) {
                locker_name += `<option selected>${places[i]}</option>`;
            }
            else {
                locker_name += `<option>${places[i]}</option>`;
            }
        }
    }
    document.getElementById("locker-name").innerHTML = locker_name;
})