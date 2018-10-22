
/*
跳转路径
 */
export function redirectTo(type, header) {
  let path = '';
  if (type === 'boss') {
    path = 'boss'
  } else {
    path = 'job'
  }
  if (!header) {
    path += '/info'
  }
}
