var datelist = []; //これが日付入力をためる変数
var timelist = []; //これが時間入力をためる変数

/*++++++++++++++++++++++++++++++++++++++コピペ++++++++++++++++++++++++++++++++++++++++++++++++++ */
/*参照 https://noveblo.com/javascript-copy/#:~:text=%E3%80%8Cnavigator.clipboard.writeText(,%E3%81%95%E3%81%9B%E3%82%8B%E3%81%A8%E3%82%8F%E3%81%8B%E3%82%8A%E3%82%84%E3%81%99%E3%81%84%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%80%82 */
function copy_results(){
    const box = document.getElementById('textbox');
    const button = document.getElementById('copy');

    button.addEventListener('click', () => {
    if (!navigator.clipboard) {
        alert("このブラウザは対応していません");
        return;
    }

    navigator.clipboard.writeText(box.textContent).then(
        () => {
        alert('文章をコピーしました。');
        },
        () => {
        alert('コピーに失敗しました。');
        });
    });
}
/*++++++++++++++++++++++++++++++++++++++++結果++++++++++++++++++++++++++++++++++++++++++++++++++ */
function print_results(){
    sortlists();
    var box = document.getElementById("textbox");
    var results_string = "";

    for (let i = 0; i < datelist.length; i++) {
        for (let l = 0; l < timelist.length; l++) {
            results_string = results_string + datelist[i] + ' ' + timelist[l] + ' \n';   
        }
    }

    box.innerHTML = results_string;

    console.log(results_string);
}
/*++++++++++++++++++++++++++++++++++++リセット++++++++++++++++++++++++++++++++++++++++++++++++++ */
function timesreset(){
    timelist = [];
    replace_times();
}

function daysreset(){
    datelist = [];
    replace_days();
}

function resultreset(){
    var box = document.getElementById("textbox");
    box.innerHTML = "";
}

/*++++++++++++++++++++++++++++++++++++並び替え++++++++++++++++++++++++++++++++++++++++++++++++++ */
function sortlists(){
    console.log(datelist.sort());
    console.log(timelist.sort());
}

/*++++++++++++++++++++++++++++++++++++++++時間++++++++++++++++++++++++++++++++++++++++++++++++++ */
function times(){
    /*時刻の入力があったら動くやつ */
    var time_element = document.getElementById("input-time");
    var time = time_element.value;

    if (!timelist.includes(time+"~") && time) { //被ってたら実行しない
        timelist.push(time + "~");
        replace_times();
    }
}

function replace_times(){
    var showtimes = document.getElementById("showtimes");
    var timeliststring = "";

    for (let index = 0; index < timelist.length; index++) {
        let time = timelist[index];
        timeliststring = timeliststring + " " + time;
    }
    showtimes.innerText = timeliststring;    
}
/* ++++++++++++++++++++++++++++++++++++++++日付+++++++++++++++++++++++++++++++++++++++++++++++++ */
function dates(){
    /*日付の入力があったら動く 日付入力欄の文字列を取得するもの そして､加工のための関数をすべて動かし､
    調整さんフォーマットの日付の配列(時刻は無い) を返す*/
    var date_element = document.getElementById("input-date");
    var date = date_element.value;

    date = format(date);
    date = date + days(date);

    //console.log(date);
    if (!datelist.includes(date.substr(5)) && date!="undefined") { //被ってたら実行しない
        datelist.push(date.substr(5));
        replace_days()
    }
    //console.log(datelist);
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
