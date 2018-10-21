/*
接口请求模块函数,一个一个暴露,函数的返回值为promise对象
 */

import ajax from './ajax'

//用户注册
export const reqRegister = (user) => {
  return ajax('/register',user,'POST')
}

//用户登陆
export const reqLogin=({username,password})=>ajax('/login',{username,password},'POST')

//更新用户接口
export const reqUpdateUser=(user)=>ajax('/savemyinfo',user,'POST')
