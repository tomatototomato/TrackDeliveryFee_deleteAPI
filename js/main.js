//テキストボックス（始点）の値が変わったら、値を取得
$("#StartPoint_PostNum_Input_TextBox").on("change",　function(){
    let postNum = $("#StartPoint_PostNum_Input_TextBox").val()
    StartPoint_AddressAPI(postNum);
});

//テキストボックス（終点）の値が変わったら、値を取得
$("#EndPoint_PostNum_Input_TextBox").on("change",　function(){
    let postNum = $("#EndPoint_PostNum_Input_TextBox").val()
    EndPoint_AddressAPI(postNum);
});

//計算ボタン
$("#Button_OutPut").on("click",　function(){
    let startPoint = $("#StartPoint_AddressValue_Result_Label").html();
    console.log(startPoint,"発送元住所を表示");
    let endPoint = $("#EndPoint_AddressValue_Result_Label").html();
    console.log(endPoint,"送り先住所を表示");

    GoogleDistanceMatrixAPI(startPoint, endPoint);
    TrackDeliverAPI();
});

//リセットボタン
$("#Button_Reset").on("click",　function(){
    window.location.reload();
});


//郵便番号から住所を出すためのAPIを呼び出し
//始点
const StartPoint_AddressAPI = async (postNum) =>{
    const addressURL = `https://jp-postal-code-api.ttskch.com/api/v1/${postNum}.json`;
    const res = await fetch(addressURL);
    const address = await res.json();
    console.log(address,"中身をチェック");
    StartPoint_createAddress(address);
}

function StartPoint_createAddress(address){
    const html =`
    ${address.addresses[0].ja.prefecture}${address.addresses[0].ja.address1}${address.addresses[0].ja.address2}
    `;
    console.log(html);
    $("#StartPoint_AddressValue_Result_Label").html(html);
}

//終点
const EndPoint_AddressAPI = async (postNum) =>{
    const addressURL = `https://jp-postal-code-api.ttskch.com/api/v1/${postNum}.json`;
    const res = await fetch(addressURL);
    const address = await res.json();
    console.log(address,"中身をチェック");
    EndPoint_createAddress(address);
}

function EndPoint_createAddress(address){
    const html = `
    ${address.addresses[0].ja.prefecture}${address.addresses[0].ja.address1}${address.addresses[0].ja.address2}
    `;
    console.log(html);
    $("#EndPoint_AddressValue_Result_Label").html(html);
}

//GoogleMap APIから値を取得
const GoogleDistanceMatrixAPI = async (Start,End) =>{
    
    const apiKey = googleMap_apiKey();

    const googleMapURL = `
    https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${Start}&origins=${End}&units=metric&key=${apiKey}
    `;

    const googleMapRes = await fetch(googleMapURL);
    const googleMap = await googleMapRes.json();
    console.log(googleMap,"中身をチェック");
    outputGoogleMap(googleMap);
}

function outputGoogleMap(googleMap) {

    let distanceValue = googleMap.rows[0].elements[0].distance.value;
    let convertDistanceValue = distanceValue * 0.001;

    console.log(convertDistanceValue,"概算距離の表示") 

    const html =`
    ${convertDistanceValue}
    `;
    console.log(html);
    $("#DistanceValue_Value_Label").html(html);
}

//GoogleSpreadSheet APIから値を取得
const TrackDeliverAPI = async () => {

    const area = $("#OriginAre_ComboBox").val();
    const apiKey = googleSpread_apiKey();

    const spreadSheetURL = `
    https://sheets.googleapis.com/v4/spreadsheets/12Njf_oKQYh-uah7LFNZt9b3jzWD2Ax40RGZs9ZFGDNM/values/${area}?key=${apiKey}
    `;

    const spreadSheetRes = await fetch(spreadSheetURL);
    const spreadSheet = await spreadSheetRes.json();
    console.log(spreadSheet, "中身をチェック");

    let distance = $("#DistanceValue_Value_Label").html();
    let convertDistance = Number(distance);
    console.log(convertDistance, "概算走行距離の中身をチェック");
    
    let row = DistanceFee(convertDistance);
    console.log(row, "該当行を抽出");

    let column = $("#TrackSize_ComboBox").val();
    let convertColumn = Number(column);
    console.log(convertColumn, "該当列を抽出");

    if(row === 21){
        let result = OverDistance200(convertDistance,convertColumn,spreadSheet);
        outputSpreadSheet(result);
    }else if(row ===22){
        let result = OverDistance500(convertDistance,convertColumn,spreadSheet);
        outputSpreadSheet(result);
    }else{
        outputSpreadSheet(spreadSheet, row, convertColumn);
    }

}

function outputSpreadSheet(spreadSheet, row, convertColumn) {

    const html = `
    ${spreadSheet.values[row][convertColumn]}
    `;
    console.log(html, "htmlの内容を表示");
    $("#DeliverCost_Value_Label").html(html);
}

function outputSpreadSheet(result) {

    const html = `
    ${result}
    `;
    console.log(html, "htmlの内容を表示");
    $("#DeliverCost_Value_Label").html(html);
}

// 距離別運賃のロジック
function DistanceFee(distance) { 
    let compareDistance = distance;

    if (compareDistance < 10) { 
        return 1;
    } else if (compareDistance < 20){
        return 2;
    } else if (compareDistance < 30) {
        return 3;
    } else if (compareDistance < 40) {
        return 4;
    } else if (compareDistance < 50) {
        return 5;
    } else if (compareDistance < 60) {
        return 6;
    } else if (compareDistance < 70) {
        return 7;
    } else if (compareDistance < 80) {
        return 8;
    } else if (compareDistance < 90) {
        return 9;
    } else if (compareDistance < 100) {
        return 10;
    } else if (compareDistance < 110) {
        return 11;
    } else if (compareDistance < 120) {
        return 12;
    } else if (compareDistance < 130) {
        return 13;
    } else if (compareDistance < 140) {
        return 14;
    } else if (compareDistance < 150) {
        return 15;
    } else if (compareDistance < 160) {
        return 16;
    } else if (compareDistance < 170) {
        return 17;
    } else if (compareDistance < 180) {
        return 18;
    } else if (compareDistance < 190) {
        return 19;
    } else if (compareDistance < 200) {
        return 20;
    } else if (compareDistance < 500) {
        return 21;
    }else {
        return 22;
    }
}

function OverDistance200(convertDistance,convertColumn,spreadSheet){

    const extraMeter = 20;
    let distance = convertDistance;
    console.log(distance,"概算距離の確認");

    let magnification = distance/extraMeter;
    console.log(magnification,"掛け数の確認");

    let minFee = spreadSheet.values[20][convertColumn];
    console.log(minFee,"最低価格");
    let extraFee = spreadSheet.values[21][convertColumn];
    console.log(extraFee,"割り増し単価");

    let addFee = extraFee*magnification;
    console.log(addFee,"割り増し価格");


    let result = parseInt(minFee) + parseInt(addFee);
    console.log(result,"運送価格");

    return result;
}

function OverDistance500(convertDistance,convertColumn,spreadSheet){

    const extraMeter = 50;
    let distance = convertDistance;
    console.log(distance,"概算距離の確認");

    let magnification = distance/extraMeter;
    console.log(magnification,"掛け数の確認");

    let minFee = Number(spreadSheet.values[20][convertColumn])+(Number(spreadSheet.values[21][convertColumn])*15);
    console.log(minFee,"最低価格");

    let extraFee = Number(spreadSheet.values[22][convertColumn]);
    console.log(extraFee,"割り増し単価");

    let addFee = extraFee*magnification;
    console.log(addFee,"割り増し価格");


    let result = parseInt(minFee) + parseInt(addFee);
    console.log(result,"運送価格");

    return result;
}