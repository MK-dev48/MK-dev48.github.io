// 現在の年月を取得
let date = new Date(); // 現在日時のDateオブジェクト
let year = date.getFullYear(); // 現在日時から年だけ取得
let month = date.getMonth() + 1; // 現在日時から月だけ取得 (0から11なので1足す)

// カレンダーを生成する関数
function createCalendar(year, month) {
    // 最初の日と最後の日を取得
    let firstDate = new Date(year, month - 1, 1); // 指定した年月から最初の日 (1日) のDateオブジェクト
    let lastDate = new Date(year, month, 0); // 指定した年月から最後の日 (0日) のDateオブジェクト

    // 最初の日の曜日と最後の日の日付を取得
    let firstDay = firstDate.getDay(); // 最初の日の曜日 (0から6)
    let lastDay = lastDate.getDate(); // 最後の日の日付 (1から31)

    // カレンダーのHTMLを格納する変数
    let html = "";

    //閉じるボタン
    //html += '<button id="close">x</button>'

    // 年月の表示
    html += `<div class="heads">`;
    html += `<button id="prev" onclick="prevMonth()">prev</button>`;
    html += `<h2>${year}年${month}月</h2>`;
    html += `<button id="next" onclick="nextMonth()">next</button>`;
    html += `</div>`;

    // 曜日の表示
    html += "<table>"; // テーブルを開始
    html += "<tr>"; // 行を開始
    html += "<td>日</td>"; // 日曜日をセルとして表示
    html += "<td>月</td>"; // 月曜日をセルとして表示
    html += "<td>火</td>"; // 火曜日をセルとして表示
    html += "<td>水</td>"; // 水曜日をセルとして表示
    html += "<td>木</td>"; // 木曜日をセルとして表示
    html += "<td>金</td>"; // 金曜日をセルとして表示
    html += "<td>土</td>"; // 土曜日をセルとして表示
    html += "</tr>"; // 行を終了

    // 日付の表示
    let day = 1; // 日付のカウンター
    for (let i = 0; i < 6; i++) { // 最大6週間分のループ
        html += "<tr>"; // 行を開始
        for (let j = 0; j < 7; j++) { // 一週間分のループ
            if (i == 0 && j < firstDay) { // 最初の週で最初の日より前の場合
                html += "<td></td>"; // 空白を表示
            } else if (day > lastDay) { // 最後の日を超えた場合
                html += "<td></td>"; // 空白を表示
                break; // ループを抜ける
            } else { // 日付を表示する場合
                if (year == date.getFullYear() && month == date.getMonth() + 1 && day == date.getDate()) { // 今日の場合
                    html += `<td class="today" data-date="${year}/${month}/${day}">${day}</td>`; // 背景色を変える
                } else { // 今日以外の場合
                    html += `<td data-date="${year}/${month}/${day}">${day}</td>`; // 日付を表示
                }
                day++; // 日付を増やす
            }
        }
        html += "</tr>"; // 行を終了
        if (day > lastDay) { // 最後の日を超えた場合
            break; // ループを抜ける
        }
    }

    html += "</table>"; // テーブルを終了
    // カレンダーを表示する要素にHTMLを挿入
    document.getElementById("calendar").innerHTML = html; // カレンダーの要素にテーブルを追加

    // 日付をクリックしたときのイベントリスナーを登録
    let cells = document.getElementsByTagName("td"); // テーブルのセルの要素をすべて取得
    for (let cell of cells) { // セルの要素に対してループ
        cell.addEventListener("click", function () { // セルをクリックしたときの関数を登録
            // クリックした日付を取得
            let selectedDate = this.dataset.date; // セルのdata-date属性の値を取得

            // 日付がある場合
            if (selectedDate) {
                // 日付を分解してDateオブジェクトに変換
                let [y, m, d] = selectedDate.split("/"); // data-date属性の値を"/"で分割して年月日に代入
                let selectedDay = new Date(y, m - 1, d); // 年月日からDateオブジェクトを作成

                // 曜日の配列
                let weekdays = ["日", "月", "火", "水", "木", "金", "土"]; // 曜日の文字列の配列

                // mm/dd(曜日)の形式に変換して出力する要素に追加
                document.getElementById("output").innerHTML += `${m}/${d}(${weekdays[selectedDay.getDay()]})~`; // 月/日(曜日)の形式にして改行をつけて出力要素に追加
            }
        });
    }
}

// 初回のカレンダー生成
createCalendar(year, month); // 現在の年月でカレンダーを生成

// 前月移動する関数 
function prevMonth() {
    month--; 
    if (month < 1) { 
    year--; 
    month = 12; 
    } 
    createCalendar(year, month); 
   }
   
   // 次月移動する関数 
   function nextMonth() {
    month++; 
    if (month > 12) { 
    year++; 
    month = 1; 
    } 
    createCalendar(year, month); 
   }


// カレンダーを開くボタンをクリックしたときのイベントリスナーを登録
document.getElementById("open").addEventListener("click", function () { // カレンダーを開くボタンをクリックしたときの関数を登録
    // カレンダーを表示する
    document.getElementById("calendar").style.display = "block"; // カレンダーの要素のdisplayスタイルをblockにする
});

/*
// 閉じるボタンをクリックしたときのイベントリスナーを登録
document.getElementById("close").addEventListener("click", function () { // 閉じるボタンをクリックしたときの関数を登録
    // カレンダーを非表示にする
    document.getElementById("calendar").style.display = "none"; // カレンダーの要素のdisplayスタイルをnoneにする
});
*/