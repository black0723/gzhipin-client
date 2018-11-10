/*
聊天组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid} from 'antd-mobile'

//异步发送消息
import {sendMsg} from '../../redux/actions'

class Chat extends Component {

  state = {
    content: '', //聊天内容
    isShowEmoji: false // 是否显示表情
  }

  //我给别人发送消息的方法
  sendSubmit = () => {
    //1.收集3个参数：需要穿3个参数，fromid，toid，content
    const fromid = this.props.user.id  //我，从redux中取
    const toid = this.props.match.params.userid  //接收消息方，从URL的参数中取
    const content = this.state.content.trim()   //内容，从输入框收集
    //2.发送请求
    if (content) {
      console.log('准备发送消息前 sendSubmit 收集到数据了', {fromid, toid, content})
      this.props.sendMsg({fromid, toid, content})
      //发送完消息清除输入数据
      this.setState({
        content: '', //清空输入内容
        isShowEmoji: false //表情输入隐藏
      })
    } else {
      //消息为空
      console.log('消息不能为空')
    }
  }

  //在第一次render()之前回调
  componentWillMount() {
    //初始化表情数据
    const emojis = [
      '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆',
      '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙',
      '😚','☺','🙂','🤗','🤔','😐','😑','😶',
      '🙄','😏','😣','😥','😮','🤐','😯','😪',
      '😫','😴','😌','😛','😜','😝','🤤','😒',  //最后一个是 Unamused Face
    ]
    //Grid表情格子需要的格式
    this.emojis = emojis.map(value => ({text: value}))
  }

  //表情显示隐藏
  toggleShow = () => {
    const isShow = !this.state.isShowEmoji
    this.setState({isShowEmoji: isShow})
    if (isShow) {
      //异步手动派发resize事件，解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      },)
    }
  }

  render() {

    //1.取数据
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    //2.计算当前聊天的chat_id
    const meId = user.id.toString() //我的id
    //如果还没有异步获取到数据，则返回null,否则继续向下会报错
    if (!users[`userid_${meId}`]) {
      return null
    }
    const targetId = this.props.match.params.userid  //接收消息方，从URL的参数中取
    //形成2给chat_id
    const chatId1 = [meId, targetId].join('_')
    const chatId2 = [targetId, meId].join('_')

    //3.对chatMsgs聊天信息进行过滤
    //msgs 里包含 我发给别人的消息，和别人发给我的消息
    const msgs = chatMsgs.filter(msg => (msg.chat_id === chatId1 || msg.chat_id === chatId2))

    //4.得到目标用户的头像
    const targetHeader = users[`userid_${targetId}`].header
    const targetIcon = targetHeader ? require(`../../assets/images/headers/${targetHeader}.png`) : null

    return (
      <div id='chat-page'>
        <NavBar>张三</NavBar>
        <List>
          {
            msgs.map((msg, index) => {
              if (meId == msg.toid) {
                /*别人发个我的*/
                return (
                  <List.Item key={index} thumb={targetIcon}>
                    {msg.content}
                  </List.Item>
                )
              } else {
                /*我发个别人的*/
                return (
                  <List.Item key={index} className={'chat-me'} extra={'我'}>
                    {msg.content}
                  </List.Item>
                )
              }
            })
          }
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={v => this.setState({content: v})}
            onFocus={() => this.setState({isShowEmoji: false})}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{marginRight: 10}}>😁</span>
                <span onClick={this.sendSubmit}>发送</span>
              </span>
            }
          />

          {
            /*表情*/
            this.state.isShowEmoji ? (
              <Grid data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => {
                      this.setState({
                        content: this.state.content + item.text
                      })
                    }}
              />) : null
          }

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  }), {sendMsg}
)(Chat)
