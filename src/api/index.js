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

//根据cookie获取用户接口
export const reqUser=()=>ajax('/user')

//根据用户类型，获取用户列表
export const reqUserList=(usertype)=>ajax('/getuserdata',{usertype})

//获取当前用户的聊天消息列表
export const reqChatMsgList=()=>ajax('/getmsglist')

//修改指定消息为已读
  export const reqReadMsg=(fromid)=>ajax('/readmsg',{fromid},'POST')

/*
前台的编写流程
1.api
2.redux
  1) action-type
  2)redux
  3)action
3.组件
 */
