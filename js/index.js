var BOSH_HOST = "http://192.168.1.238:7070/http-bind/";
var SHORT_HOST_NAME = "of3";
var LOGON_USER = "t002";
var LOGON_PWD = "t002";

var my = {
    connection: null,
    connected:false
};

$(document).ready(function () {

});


//Connect
function connect_server() {
    var conn = new Strophe.Connection(BOSH_HOST);//使用Strophe的連線方法
    // connect: function (jid, password, callback, wait, hold, route)
    // jid: 登入帳號需含域名以@隔開,
    // password: 登入帳號密碼
    // callback: 回呼函數這裡我們用來處理連線狀態以便確認連線成功與否
    // wait、hold、route 均為非必要參數，詳細作用請翻閱官方說明及參閱XEP-124規範
    conn.connect(LOGON_USER+"@"+SHORT_HOST_NAME, LOGON_PWD, function (status) {
        // 判斷連線狀態，開發者依據目前連線狀態，附加動作或聆聽事件
        if(status === Strophe.Status.CONNECTED) {
            //連線成功
            $("#message").append("<p>Connected!!!</p>");
            my.connected = true;
        }else if(status === Strophe.Status.CONNECTING){
            //連線中，尚未確認成功
            $("#message").append("<p>Connecting!!!</p>");
        }else if(status === Strophe.Status.DISCONNECTED) {
            //斷線
            $("#message").append("<p>Disconnected!!!</p>");
            my.connected = false;
        }else if(status === Strophe.Status.DISCONNECTING) {
            //斷線中
            $("#message").append("<p>Disconnecting!!!</p>");
        }else if(status === Strophe.Status.ERROR){
            //連線錯誤
            $("#message").append("<p>An error has occurred</p>");
        }else if(status === Strophe.Status.CONNFAIL){
            //連線失敗
            $("#message").append("<p>Connection fail!!!</p>");
        }else{
            //其他不在篩選範圍的狀態顯示
            $("#message").append("<p>Status:"+status+"</p>");
        }
    });
    my.connection = conn;
}


//Disconnect
function disconnect_server() {
    my.connection.disconnect();
    my.connected = false;

}