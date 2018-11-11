/**
 * 消息主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

/*
对chatMsgs进行分组，根据chat_id分组，然后显示最后一条数据
并得到每个组lastMsg组成的数组
1.找出每个聊天的lastMsg，并用一个对象容器存起来{chat_id,lastMsg}
2.得到所有的lastMsg数组
3.对数组进行排序，create_time 降序
4.顺便统计每组的未读条数（别人发我的未读消息）
 */
function getLastMsgs(chatMsgs, userid) {
  // 1.找出每个聊天的lastMsg，并用一个对象容器存起来{chat_id,lastMsg}
  const lastMsgObjs = {}
  chatMsgs.forEach((msg) => {

    //别人发我的消息,未读，+1
    if (msg.toid == userid && msg.isread=='false') {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }

    const chatId = msg.chat_id
    const lastMsg = lastMsgObjs[chatId]
    if (!lastMsg) {
      //没有找到，保存
      lastMsgObjs[chatId] = msg
    } else {
      //有找到
      //累加未读数量，并保存
      const unReadCount = lastMsg.unReadCount + msg.unReadCount

      //如果msg比lastMsg晚，就将msg保存为lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      //累加未读数量，并保存
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  })

  // 2.得到所有的lastMsg数组,对象转数组
  const lastMsgs = Object.values(lastMsgObjs)

  // 3.对数组进行排序，create_time 降序
  lastMsgs.sort(function (m1, m2) {
    //-1 m1>m2,
    return m2.create_time - m1.create_time
  })

  return lastMsgs
}

class Message extends Component {
  render() {

    //1.取数据
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    //对chatMsgs进行分组，根据chat_id分组，然后显示最后一条数据
    const lastMsgs = getLastMsgs(chatMsgs, user.id)

    return (
      <List style={{marginTop: 45, marginBottom: 45}}>
        {
          lastMsgs.map((msg, index) => {
            //debugger
            const targetUserId = msg.toid == user.id ? msg.fromid : msg.toid
            const targetUser = users[`userid_${targetUserId}`]

            return (
              <Item key={index}
                    onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                    thumb={targetUser.header ? require(`../../assets/images/headers/${targetUser.header}.png`) : null}
                    arrow='horizontal'
                    extra={<Badge text={msg.unReadCount}/>}>
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }

      </List>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }), {}
)(Message)
