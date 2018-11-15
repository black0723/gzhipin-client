/*
显示用户的UI组件
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
//处理非路由组件引用不到路由组件的属性
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const Header = Card.Header
const Body = Card.Body


class UserList extends Component {
  static propsTypes = {
    userList: PropTypes.array.isRequired
  }

  render() {
    const {userList} = this.props

    return (
      <WingBlank style={{marginBottom:55,marginTop:45}}>
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim type={'scale'} delay={100}>
        {
          userList.map((user,index) => (
            <div key={index}>
              <WhiteSpace/>
              {
                user.usertype==='boss'?
                  <Card onClick={()=>this.props.history.push(`/chat/${user.id}`)}>
                    <Header
                      thumb={require(`../../assets/images/headers/${user.header}.png`)}
                      extra={user.username}/>
                    <Body>
                    <div >案例类型: {user.category1}</div>
                    <div style={{marginTop:5}}>案例类型: {user.category2}</div>
                    <div style={{marginTop:5}}>律师证信息: {user.post}</div>
                    <div style={{marginTop:5}}>律师胜率: {user.winrate}</div>
                    <div style={{marginTop:5}}>收费要求: {user.salary}</div>
                    <div style={{marginTop:5}}>律师类型: {user.category}</div>
                    <div style={{marginTop:5}}>胜诉案例: {user.example}</div>
                    <div style={{marginTop:5}}>个人简介: {user.info}</div>
                    </Body>
                  </Card>
                  :
                  <Card onClick={()=>this.props.history.push(`/chat/${user.id}`)}>
                    <Header
                      thumb={require(`../../assets/images/headers/${user.header}.png`)}
                      extra={user.username}/>
                    <Body>
                    <div >案例类型: {user.category1}</div>
                    <div style={{marginTop:5}}>案例类型: {user.category2}</div>
                    <div style={{marginTop:5}}>个人简介: {user.info}</div>
                    </Body>
                  </Card>
              }

            </div>
          ))
        }
        </QueueAnim>
      </WingBlank>
    )
  }
}

//处理非路由组件引用不到路由组件的属性
export default withRouter(UserList)
