var datelist = []; //これが日付入力をためる変数
var timelist = []; //これが時間入力をためる変数

function times(){
    /*全部ここでやるタイプ */
    var time_element = document.getElementById("input-time");
    var time = time_element.value;


    console.log(time);
}

function dates(){
    /*日付入力欄の文字列を取得するもの そして､加工のための関数をすべて動かし､
    調整さんフォーマットの日付の配列(時刻は無い) を返す*/
    var date_element = document.getElementById("input-date");
    var date = date_element.value;

    date = format(date);
    date = date + days(date);

    //console.log(date);

    datelist.push(date.substr(5));
    
    //console.log(datelist);

    replace_days()
}

function days(datestr){
    /*これは文字列のdateを日付型にし､受け取ったdateに応じて曜日の文字を返す */
    var datedate = new Date(datestr);
    var weekdays = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"]
    var wday = datedate.getDay();


    return weekdays[wday];
}

function format(datestr){
    /*これはInputから受け取ったデータを-から/にっする */
    for (let i = 0; i < 2; i++) {
        datestr = datestr.replace('-','/');   
    }
    return datestr
}

function replace_days(){
    var showdates = document.getElementById("showdates");
    var dateliststring = "";
    for (let index = 0; index < datelist.length; index++) {
        let date = datelist[index];
        dateliststring = dateliststring + " " + date;
    }
    showdates.innerText = dateliststring;
}