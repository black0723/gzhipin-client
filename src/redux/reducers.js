/*
包含n个reducer函数，根据老的state和指定的action，返回一个新的state
 */

import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'
import {redirectTo} from '../utils/index'

//user初始值，因为状态由redux管理了，所以这里要有初始值
const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''  //需要自动重定向的路径
}

/*
action = {type,data}
 */
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      //return action.data
      //return {...state, ...action.data}
      const {type, header} = action.data
      return {...action.data, redirectTo: redirectTo(type, header)}
    case ERROR_MSG:
      console.log('-----', action.data)
      console.log('=====', {...state, msg: action.data})
      return {...state, msg: action.data}
    default:
      return state
  }
}

function xxx(state = 0, action) {
  return state
}

function yyy(state = 0, action) {
  return state
}

//向外暴露
export default combineReducers({
  user,
  xxx,
  yyy
})

//向外暴露的状态的结构： {xxx:0,yyy:0}
