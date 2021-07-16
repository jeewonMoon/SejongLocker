let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.55015242280108, 127.07317274497449), // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
    };

let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
let map_info = [
    [37.55015242280108, 127.07317274497449],
    [37.54958538231437, 127.07373303546895],
    [37.5525372930066, 127.07418295407864],
    [37.54863115461672, 127.07448549471746],
    [37.55106318664506, 127.07577655403072],
    [37.55236259092862, 127.07334687258835],
    [37.55131634095535, 127.07331959671568],
    [37.551837717451065, 127.07404576885557],
    [37.55047746057364, 127.07290469307453],
    [37.54897946345161, 127.07376803119618],
    [37.552286657021284, 127.07395833199193],
    [37.549984309088, 127.07451433927284],
    [37.54949614731049, 127.07507117487955]
];

let markerPos = new Array();
let marker2 = new Array();

for (let i = 0; i < map_info.length; i++) {
    markerPos[i] = new kakao.maps.LatLng(map_info[i][0], map_info[i][1]);
}

for (let i = 0; i < map_info.length; i++) {
    markerPos[i] = new kakao.maps.Marker({
        position: markerPos[i]
    })
}
/*
// 마커가 표시될 위치입니다 
let markerPosition = new kakao.maps.LatLng(37.55013918209962, 127.07316850443083);

// 마커를 생성합니다
let marker = new kakao.maps.Marker({
    position: markerPosition
});
*/

// 마커가 지도 위에 표시되도록 설정합니다
markerPos[0].setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);

function changePlace() {
    let id = document.getElementById('select-place');
    let value = id.options[id.selectedIndex].value;
    for (let i = 0; i < markerPos.length; i++) {
        markerPos[i].setMap(null);
    }
    if (value != -1) {
        markerPos[value].setMap(map);
    }
}