/*
包含所有的action creator 函数的模块
 */
import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'

import {
  reqRegister,
  reqLogin,
  reqUpdateUser
} from '../api/index'

/*
2.同步action
 */
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})


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
      //成功,分发同步的action, 直接返回包含原始对象，而不是result.data
      dispatch(authSuccess(result.data))
    } else {
      //十八
      dispatch(errorMsg(result.msg))
    }
  }

}
