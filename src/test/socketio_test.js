/*
引入客户端io
 */
/*
import io from 'socket.io-client'

//1.链接服务器，得到代表链接的socket对象
const socket = io('ws://localhost:8080/essm-maven-plus-react-server/websocket')

//2.绑定receiveMsg的监听，来接收服务器发送的消息
socket.on('receiveMsg', function (data) {
  console.log('浏览器端接收到消息:', data)
})

//3.向服务器发送消息
socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('浏览器端向服务器发送消息:', {name: 'Tom', date: Date.now()})
*/

let websocket = null;
//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
  websocket = new WebSocket("ws://localhost:8080/essm-maven-plus-react-server/websocket")
}
else {
  alert('当前浏览器 Not support websocket')
}

//连接发生错误的回调方法
websocket.onerror = function () {
  setMessageInnerHTML("WebSocket连接发生错误")
};

//连接成功建立的回调方法
websocket.onopen = function () {
  setMessageInnerHTML("测试WebSocket连接成功")
  send()
}

//接收到消息的回调方法
websocket.onmessage = function (event) {
  setMessageInnerHTML(event.data)
}

//连接关闭的回调方法
websocket.onclose = function () {
  setMessageInnerHTML("测试WebSocket连接关闭")
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  closeWebSocket()
}

//将消息显示在网页上
function setMessageInnerHTML(innerHTML) {
  //document.getElementById('message').innerHTML += innerHTML + '<br/>';
  console.log('我是服务器消息-->',innerHTML)
}

//关闭WebSocket连接
function closeWebSocket() {
  websocket.close()
}

//发送消息
function send() {
  let message = '我是浏览器消息'  //document.getElementById('text').value
  websocket.send(message)
}
