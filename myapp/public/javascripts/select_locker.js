async function showLockerName(building){
    let lockernames = "";
    
    if(building == ""){
        lockernames += `<option selected>먼저 사물함 건물을 선택해주세요.</option>`;
    }
    else{
        try{
            let data = await axios.get(`http://localhost:3000/locker/showLockerName?building=${building}`);
            
            console.log(data);
    
            let result = data.data.result;
            if(result.length > 0){
                lockernames += `<option value="" selected>사물함 선택</option>`
                for(let i = 0; i < result.length; i++){
                    lockernames += `<option value="${result[i].lockername}">${result[i].lockername}</option>`;
                }
            }
            else{
                lockernames += `<option value="" selected>없음</option>`;
            }
        }catch(error){
            console.log(error);
        }
    }
    document.getElementById("locker-name").innerHTML = lockernames;
}