let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.55089242280108, 127.07439774497449), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
let arr = [];
let places = ['사물함 건물 위치 선택', '광개토관', '군자관', '다산관', '대양홀', '대양AI센터', '영실관', '용덕관', '율곡관', '이당관', '집현관', '충무관', '세종관', '학생회관'];
let select_place = "";
for (let i = 0; i < places.length; i++) {
    if (i == 0) {
        select_place += `<option selected>${places[i]}</option>`;
    }
    else {
        select_place += `<option>${places[i]}</option>`;
    }
}
document.getElementById("select-place").innerHTML = select_place;

/*
// 마커가 표시될 위치입니다 
let markerPosition = new kakao.maps.LatLng(37.55013918209962, 127.07316850443083);

// 마커를 생성합니다
let marker = new kakao.maps.Marker({
    position: markerPosition
});
*/
function markerPlace(x, y) {
    if (arr != '') {
        arr.shift().setMap(null);
    }
    let marker = new kakao.maps.LatLng(y, x);
    marker = new kakao.maps.Marker({
        position: marker
    })
    arr.push(marker);
    marker.setMap(map);
}

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);
document.getElementById('select-place').addEventListener('change', function () {
    let target = document.getElementById('select-place');
    let address = target.options[target.selectedIndex].text;
    if (address != "사물함 건물 위치 선택") {
        fetch('https://dapi.kakao.com/v2/local/search/keyword.json?query=세종대학교%20' + address,
            { // 헤더에 api키 넣으면 됩니다.
                headers: { "Authorization": "KakaoAK 84ba6228f2f7a5f35ca89b1c459849ec" }
            }).then(res => res.json())
            .then(res => markerPlace(Number(res['documents'][0]['x']), Number(res['documents'][0]['y'])));
    }
    else {
        if (arr != '') {
            arr.shift().setMap(null);
        }
    }

});
