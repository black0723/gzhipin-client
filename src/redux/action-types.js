/*
包 含 所 有 action的 type常 量 名 称 的 模 块
*/

//1.用户相关
//注册登录成功,操作user
export const AUTH_SUCCESS = 'auth_success'
//错误提示消息,操作user
export const ERROR_MSG = 'error_msg'
//接收用户,操作user
export const RECEIVE_USER = 'receive_user'
//重置用户,操作user
export const RESET_USER = 'reset_user'

//2.用户列表相关
//接收用户列表，操作userlist
export const RECEIVE_USER_LIST = 'receive_user_list'

//3.消息相关
//接收消息列表
export const RECEIVE_MSG_LIST = 'receive_msg_list' //接收的所有的消息的列表
//接收一条消息
export const RECEIVE_MSG = 'receive_msg'
//阅读一条消息
export const MSG_READ = 'msg_read'
