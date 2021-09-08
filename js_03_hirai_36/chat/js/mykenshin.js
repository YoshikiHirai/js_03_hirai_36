'use strict'

// firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyB4nu9ucCeAA9Y75bs_ZJSub1-JlfO2yCI",
  authDomain: "gskadai3.firebaseapp.com",
  databaseURL: "https://gskadai3-default-rtdb.firebaseio.com/",
  projectID: "gskadai3",
  storageBucket: "gskadai3.appspot.com",
  messagingSenderId: "315096599480",
  appId: "1:315096599480:web:badc4fbba256742ddf1d4d"      
};
firebase.initializeApp(firebaseConfig);

const btn = document.getElementsByClassName("btns");
const preBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", () => {
    const slide = document.querySelector(".slide ul").children;
    const Indicator = document.querySelector(".indicator").children;

    const lastSlideIndex = slide.length - 1;
    const firstSlideIndex = 0;
    const lastIndicatorIndex = Indicator.length - 1;
    const firstIndicatorIndex = 0;

    const firstItem = slide.item(firstSlideIndex);
    const lastItem = slide.item(lastSlideIndex);
    const firstIndicator = Indicator.item(firstIndicatorIndex);
    const lastIndicator = Indicator.item(lastIndicatorIndex);

    if (btn[i] === preBtn) {
      setTimeout(() => {
        firstItem.parentNode.insertBefore(lastItem, firstItem);
        firstIndicator.parentNode.insertBefore(
          firstIndicator,
          lastIndicator.nextSibling
        );
      }, 400);
    } else if (btn[i] === nextBtn) {
      setTimeout(() => {
        lastItem.parentNode.insertBefore(firstItem, lastItem.nextSibling);
        firstIndicator.parentNode.insertBefore(lastIndicator, firstIndicator);
      }, 400);
    }
  });
}


// 最初は問診以下は非表示にする

$(function() {
  $('button').click(function() {
    $('#non-display').fadeIn(1000);
  });
});

// グローバル変数の定義※ここで定義すると、入力後の数値が取れない、、なぜ、、
// let date = $('#key').val();
// let username = $('#name').val();
// let cm = Number($('#height').val());
// let kg = Number($('#weight').val());
// let m = (cm/100);
// let bmi = (kg/(m*m));

// firebaseに飛ばすfunctionを定義
const room = "inquiry_room";
const newPostRef = firebase.database().ref(room);


$(function(){
    $('#result-btn').click( function (){
    // BMIの計算とリスクチェック
    let cm = Number($('#height').val());
    let kg = Number($('#weight').val());
    let m = (cm/100);
    let bmi = (kg/(m*m));

    $('#bmi_input').replaceWith(bmi.toFixed(2));

    // firebaseに飛ばすデータを定義
    let date = $('#key').val();
    let username = $('#name').val();
    let fam = $('input[name="r1"]:checked').val();
    let tooth = $('input[name="r2"]:checked').val();
    let smk = $('input[name="r3"]:checked').val();
    let psv = $('input[name="r4"]:checked').val();

    // firebaseにデータを送信

    newPostRef.push({
      NOWDATE : date,
      USER : username,
      WEIGHT : kg,
      HEIGHT : m,
      BMI : bmi,
      FAMILY : fam,
      TOOTH : tooth,
      SMOKING : smk,
      PASSIVE : psv
    })
    
    // クリックでページ遷移
    location.href = './result.html';
  }
  )})