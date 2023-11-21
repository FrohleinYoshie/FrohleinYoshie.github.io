var 果物 = {
    "apple":22,
    "orange":43,
    "ブドウ":26,
    "バナナ":69,
    "ぱいん":52,
    "もも":54,
    "木苺":85,
    "muscat":11,
    "さくらんぼ":24,
    "スイカ":33,
    "プルーン":44,
    "キウイ":55,
    "なし":66,
    "ルレクチェ":77,
    "メロン":88,
    "lemon":99,
    "柿":1,
    "スターフルーツ":45,
    "ドラゴンフルーツ":83,
    "梅":54,
    "ビワ":69,
    "なつめ":31,
    "ブルーベリー":89,
    "ドリアン":23
}




$(function(){
    $("#スライダー").slider({
        min:1,
        max:100,
        values:[10,40],
        range:true,
        slide: function(e,ui){
            showData(ui.values[0],ui.values[1]);
            $("#スライダー値").html("きらい(min)"+ui.values[0]+"</br>大好き(max)"+ui.values[1]);
        }
    })
})
function showData(start,end){
    var result="<table><th>名前</th><th>好き度</th>"
    for(var i in 果物){
        if(果物[i]>=start && 果物[i]<=end){
            result += "<tr><td>"+i +"</td><td>"+ 果物[i]+"</td></tr>"; //課題ではこの部分を変える
        }
    }
    result+="</tabel>";
    $("#show").html(result);
}