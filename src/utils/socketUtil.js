export function getWebsocket(userId) {
    //判断当前浏览器是否支持WebSocket
    let websocket = null
    if ('WebSocket' in window) {
      websocket = new WebSocket(`ws://localhost:8080/essm-maven-plus-react-server/websocket/${userId}`)
      console.log('getWebsocket() WebSocket初始化了~')
      return websocket
    }
}


