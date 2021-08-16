let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
let options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.55086613039136, 127.07398854977728), //지도의 중심좌표.
	level: 4 //지도의 레벨(확대, 축소 정도)
};

let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
let zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


// 건물 좌표
let points = [
    // 광개토관[0]
    new kakao.maps.LatLng(37.55035740942844, 127.0731944316302),
    // 군자관[1]
    new kakao.maps.LatLng(37.549651406905255, 127.07372819121483),
    // 다산관[2]
    new kakao.maps.LatLng(37.55256256100166, 127.07418416674864),
    // 대양홀[3]
    new kakao.maps.LatLng(37.548658134763045, 127.07448417482593),
    // 대양AI센터[4]
    new kakao.maps.LatLng(37.55090631828088, 127.07553179821001),
    // 영실관[5]
    new kakao.maps.LatLng(37.552399429129395, 127.07330675912306),
    // 용덕관[6]
    new kakao.maps.LatLng(37.55133447370778, 127.07331526014652),
    // 율곡관[7]
    new kakao.maps.LatLng(37.55187546384071, 127.07404470463635),
    // 이당관[8]
    new kakao.maps.LatLng(37.55049848664328, 127.07290301117297),
    // 집현관[9]
    new kakao.maps.LatLng(37.54907584487294, 127.07362452539758),
    // 충무관[10]
    new kakao.maps.LatLng(37.55233150669927, 127.07395711930943),
    // 세종관[11]
    new kakao.maps.LatLng(37.54999930986129, 127.07451513937089),
    // 학생회관[12]
    new kakao.maps.LatLng(37.549579378014286, 127.07512678463893)
]

// 마커 초기 생성
let markers = [];
for(let m = 0; m <= 12; m++){
    let marker = new kakao.maps.Marker({ position : points[m] });
    // 지도 위 마커 표시
    // marker.setMap(map);
    markers.push(marker);
}

// select 태그에서 선택될 때 마다 호출
function kakaomapMaker(building){
    for(let i = 0; i < markers.length; i++){
        // 지도 위 마커 제거
        markers[i].setMap(null);
    }

    if(building == "사물함 건물 위치 선택"){
        // map.panTo(new kakao.maps.LatLng(37.55051651615155, 127.07348948498165));
    }
    else if(building == "광개토관"){
        map.panTo(points[0]);
        markers[0].setMap(map);
    }
    else if(building == "군자관"){
        map.panTo(points[1]);
        markers[1].setMap(map);
    }
    else if(building == "다산관"){
        map.panTo(points[2]);
        markers[2].setMap(map);
    }
    else if(building == "대양홀"){
        map.panTo(points[3]);
        markers[3].setMap(map);
    }
    else if(building == "대양AI센터"){
        map.panTo(points[4]);
        markers[4].setMap(map);
    }
    else if(building == "영실관"){
        map.panTo(points[5]);
        markers[5].setMap(map);
    }
    else if(building == "용덕관"){
        map.panTo(points[6]);
        markers[6].setMap(map);
    }
    else if(building == "율곡관"){
        map.panTo(points[7]);
        markers[7].setMap(map);
    }
    else if(building == "이당관"){
        map.panTo(points[8]);
        markers[8].setMap(map);
    }
    else if(building == "집현관"){
        map.panTo(points[9]);
        markers[9].setMap(map);
    }
    else if(building == "충무관"){
        map.panTo(points[10]);
        markers[10].setMap(map);
    }
    else if(building == "세종관"){
        map.panTo(points[11]);
        markers[11].setMap(map);
    }
    else if(building == "학생회관"){
        map.panTo(points[12]);
        markers[12].setMap(map);
    }
}