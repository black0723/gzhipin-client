/*
包含n个reducer函数，根据老的state和指定的action，返回一个新的state
 */
import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './action-types'
import {redirectTo} from '../utils/index'

/*
1.user初始值，因为状态由redux管理了，所以这里要有初始值
 */
const initUser = {
  username: '',
  usertype: '',
  msg: '',
  redirectTo: ''  //需要自动重定向的路径
}

/*
  action = {type,data}
  1.用户信息
 */
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      //return action.data
      //return {...state, ...action.data}
      const {usertype, header} = action.data
      return {...action.data, redirectTo: redirectTo(usertype, header)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

/*
 2.初始化用户列表为数组
 */
const initUserList = []

/*
产生userList状态的redux
2.用户列表数组
 */
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data  //data的值为userlist
    default:
      return state
  }
}

//聊天列表初始列表
const initChat = {
  users: {}, //所有用户，属性名是userid,属性值{username,header}
  chatMsgs: [], //用户的收，发 消息
  unReadCount: 0 //未读消息数量，在底部消息导航显示
}

/*
3.产生聊天状态的reducer
 */
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:  //data {users:{},chatMsgs}
      const {users, chatMsgs} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: 0
      }
    case RECEIVE_MSG:  //data :chatMsg
      const chatMsg = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],  //合并数组（新消息和旧消息）
        unReadCount: 0
      }
    default:
      return state
  }

}

//向外暴露
export default combineReducers({
  user,
  userList,
  chat
})

/*
reducers 定义数据状态，例如user,userList,chat
 */
//向外暴露的状态的结构： {xxx:0,yyy:0}
//向外暴露的状态的结构： {user:{},userList:[]}
