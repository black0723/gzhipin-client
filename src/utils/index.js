
/*
跳转路径
用户主界面
  /boss
  /job
用户信息完善界面
  /bossinfo
  /jobinfo

  判断是否已经完善信息?user.header有没有值
  判断用户类型?user.usertype
 */
export function redirectTo(type, header) {
  let path = '';
  if (type === 'boss') {
    path = '/boss'
  } else if(type ==='job') {
    path = '/job'
  }else{
    console.log('path 未匹配')
  }

  if (!header) {
    path += 'info'
  }
  return path
}
