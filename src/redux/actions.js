/*
包含所有的action creator 函数的模块
 */
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './action-types'

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api/index'

import {getWebsocket} from '../utils/socketUtil'

/*
2.同步action
 */
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
//暴露出来，退出登录需要
export const resetUser = (msg) => ({type: RESET_USER, data: msg})

//接收用户列表的同步action
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

//接受所有的消息列表的同步action
export const receiveMsgList = ({users, chatMsgs}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs}})

//接收1条消息的同步action
export const receiveMsg = (chatMsgs) => ({type: RECEIVE_MSG, data: chatMsgs})

/*
1.异步的用户注册的action
 */
export const register = (user) => {
  const {username, password, password2, usertype} = user
  //做表单的前台检查，如果不通过返回一个errorMsg的同步action
  if (!username) {
    return errorMsg('用户名不能为空！')
  } else if (!password) {
    return errorMsg('密码不能为空！')
  } else if (password != password2) {
    return errorMsg('两次密码不一样！')
  }

  //异步需要返回一个函数
  return async dispatch => {
    //发送注册的异步Ajax请求
    // const promise = reqRegister(user)
    // promise.then(response=>{
    //   const result =response.data  // {code:0/1,data:user,msg:''}}
    // })

    //异步等待返回
    const response = await reqRegister({username, password, usertype})
    const result = response.data  // {code:0/1,data:user,msg:''}}
    if (result.code === 0) {
      getChatMsgList(dispatch, result.data.id)
      //成功
      //分发同步action
      dispatch(authSuccess(result.data))
    } else {
      //失败
      //分发同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

//用户登陆
export const login = (user) => {
  const {username, password} = user
  if (!username) {
    return errorMsg('用户名不能为空')
  } else if (!password) {
    return errorMsg('密码不能为空')
  }

  //异步请求，返回的是一个函数
  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) {
      getChatMsgList(dispatch, result.data.id)
      //成功,分发同步的action, 直接返回包含原始对象，而不是result.data
      dispatch(authSuccess(result.data))
    } else {
      //十八
      dispatch(errorMsg(result.msg))
    }
  }

}

//更新用户信息
export const updateUser = (user) => {
  return async dispatch => {
    const resp = await reqUpdateUser(user)
    const result = resp.data
    if (result.code === 0) {
      //成功 data:user
      dispatch(receiveUser(result.data))
    } else {
      //失败 msg
      dispatch(resetUser(result.msg))
    }
  }
}

//获取用户的异步action
export const getUser = () => {
  return async dispatch => {
    //执行异步请求
    const resp = await reqUser()
    const result = resp.data
    if (result.code === 0) {
      getChatMsgList(dispatch, result.data.id)
      console.log('result.data=', result.data)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

//获取用户列表的异步action
export const getUserList = (usertype) => {
  //1.执行异步action
  return async dispatch => {
    const resp = await reqUserList(usertype)
    //2.得到结果后分发一个同步action
    //debugger
    const result = resp.data
    console.log('getUserList result = ', result)
    //dispatch(receiveUserList(result))
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

//异步获取消息列表函数，在用户登陆（注册成功，登陆，自动登陆）之后就调用来获取消息
async function getChatMsgList(dispatch, userid) {
  //这里应该发送socket请求了。TODO
  initReceiveSocketIO(dispatch, userid)
  //异步获取数据
  const resp = await reqChatMsgList()
  const result = resp.data
  if (result.code === 0) {
    const {users, chatMsgs} = result.data //data{users:{},chatMsgs}
    //分发同步action
    dispatch(receiveMsgList({users, chatMsgs}))
  }
}

/*
单例模式
1.创建对象之前，判断对象是否已经创建，没创建才去创建
2.创建对象之后，保存对象
 */


/*
发送消息的action,使用socket发请求
data:{formid,toid,content}
 */
export const sendMsg = (data) => {
  return dispatch => {
    initSocketIO(data, dispatch, data.fromid)
  }
}

/*
初始化sockio,
1.发送给服务器端消息
2.接收服务器返回的消息
 */
function initSocketIO(data, dispatch, userid) {
  let websocket = getWebsocket(data.fromid)
  //连接成功建立的回调方法
  websocket.onopen = function () {
    if (data.content) {
      websocket.send(JSON.stringify(data))
    }
  }

  //接收到消息的回调方法
  websocket.onmessage = function (event) {
    const chatMsg = event.data
    console.log('initSocketIO接收到服务器的消息：', chatMsg)
    //此消息是所有的广播消息，要从chatMsg找出与当前用户相关的详细

    //此时的chatMsg是字符串，需要转json
    const chatMsgJson = JSON.parse(chatMsg)
    //debugger
    if (chatMsgJson.fromid == userid || chatMsgJson.toid == userid) {
      //分发同步action，保持消息到redux中
      dispatch(receiveMsg(chatMsgJson))
    }
  }

  //连接关闭的回调方法
  websocket.onclose = function () {
    console.log("测试WebSocket连接关闭")
  }
}

/*
初始化sockio,
2.接收服务器返回的消息
 */
function initReceiveSocketIO(dispatch, userid) {
  let websocket = getWebsocket(userid)
  //接收到消息的回调方法
  websocket.onmessage = function (event) {
    const chatMsg = event.data
    console.log('initReceiveSocketIO接收到服务器的消息：', chatMsg)
    //此消息是所有的广播消息，要从chatMsg找出与当前用户相关的详细
    //此时的chatMsg是字符串，需要转json
    const chatMsgJson = JSON.parse(chatMsg)
    //debugger
    if (chatMsgJson.fromid == userid || chatMsgJson.toid == userid) {
      //分发同步action，保持消息到redux中
      dispatch(receiveMsg(chatMsgJson))
    }
  }

  //连接关闭的回调方法
  websocket.onclose = function () {
    console.log("测试WebSocket连接关闭")
  }
}
