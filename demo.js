// var 学校 = document.getElementById("demo").innerHTML;
// console.log(学校);

// var 大胆な = document.querySelector("h1").innerHTML;
// console.log(大胆な);

// var リスト = document.querySelector("li").innerHTML;
// console.log(リスト);

// var リスト列 = document.querySelectorAll(".navi li");

// for( i =0; i<リスト列.length; i++){
//     console.log(リスト列[i].innerHTML);
// }

// document.getElementById("demo").innerHTML = "開志専門職大学,米山キャンパス";
// document.querySelector("h1").innerHTML = "kaishi professional universitey , Yoneyama Campus"

// document.querySelector("li").innerHTML = "犬";

// var データ = ["うさぎ","へび","猫"];
// var リスト列 = document.querySelectorAll(".navi li");

// for(i=0; i<リスト列.length ; i++){
//     リスト列[i].innerHTML = データ[i];
// }

var 学校 = document.createElement("h1");
学校.textContent ="Welcome to Niigata City !";
document.getElementById("demo").appendChild(学校);

var データ = ["🍇","apple","イチゴ"];
var リスト = document.getElementById("navi");

for(i =0; i<データ.length; i++){
    要素 = document.createElement("li");
    要素.textContent = データ[i];
    リスト.appendChild(要素);
}

function 名前とる(n){
    var メッセージ = "Hello ! " + n + " How are you ?";
    document.getElementById("demo").innerHTML = メッセージ
}