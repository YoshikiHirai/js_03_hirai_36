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

// Firebaseに保管されているデータの内、入力日付が最も新しいものを呼び出し。ｘ
const database = firebase.database().ref("inquiry_room");
database.orderByChild('NOWDATE').startAt(1).limitToLast(1).
once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    let childKey = childSnapshot.key;
    let childData = childSnapshot.val();
    console.log(childKey);
    console.log(childData.HEIGHT);
    // ここまでで正しくKey Dataが読み取れていることは確認
    // 以下、リスクチェックを入れる
    let childBMI = childData.BMI;
    let childFAMILY = childData.FAMILY;
    let childTOOTH = childData.TOOTH;
    let childSMOKING = childData.SMOKING;
    let childPASSIVE = childData.PASSIVE;
      if ( childBMI <= 20) {
      $('#risk-bmi').prop("checked",true);
      }
    
    // 家族病歴のリスクチェック
    if ( childFAMILY == "Yes") {
      $('#risk-fam').prop("checked",true);
    }
    // 歯周病のリスクチェック
    if ( childTOOTH == "Yes") {
      $('#risk-tooth').prop("checked",true);
    }
    // タバコのリスクチェック
    if (childSMOKING == "Yes") {
      $('#risk-smk').prop("checked",true);
    }
    // 受動喫煙のリスクチェック
    if (childPASSIVE == "Yes") {
      $('#risk-psv').prop("checked",true);
      }
        // リスク因子の数をカウントし、表に加える
        const cnt = $('input:checkbox:checked').length;
        $('#risk-cnt').text(cnt + '個');

  });
});

// on('value', (childSnapshot) =>{
//   const data = childSnapshot.val();
//   console.log(data);
//   console.log(data.USER);
// })


// const room = "inquiry_room";
// let getItem =  () => {
//   database.ref(room)
// }

// database.ref(room)
// .on("value", (data)=> {
//     if (data) {
//         const rootList = data.val();
//         const key2 = data.key;
//         let list = [];
//           // データオブジェクトを配列に変更する
//         if(rootList != null) {
//             Object.keys(rootList).forEach((val, key2) => {
//                 rootList[val].id = val;
//                 list.push(rootList[val]);
//             })
//         }
//     }
// });



// firebase.database().ref('inquiry_room')
// .orderByChild('NOWDATE').startAt(1).limitToLast(1)
// .once('value',function(snapshot) {console.log(snapshot.val())})

// const items = snapshot.docs;
// console.log(items)

  // $('#result-btn2').click( function (data){
  //   let v = data.val();
  //   console.log(v);
  // })
