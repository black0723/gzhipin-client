/*
显示用户的UI组件
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
//处理非路由组件引用不到路由组件的属性
import {withRouter} from 'react-router-dom'

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
                    <div>律师证信息: {user.post}</div>
                    <div>律师胜率: {user.winrate}</div>
                    <div>收费要求: {user.salary}</div>
                    <div>律师类型: {user.category}</div>
                    <div>胜诉案例: {user.example}</div>
                    <div>个人简介: {user.info}</div>
                    </Body>
                  </Card>
                  :
                  <Card onClick={()=>this.props.history.push(`/chat/${user.id}`)}>
                    <Header
                      thumb={require(`../../assets/images/headers/${user.header}.png`)}
                      extra={user.username}/>
                    <Body>
                    <div>案例类型: {user.exampletype}</div>
                    <div>个人简介: {user.info}</div>
                    </Body>
                  </Card>
              }

            </div>
          ))
        }
      </WingBlank>
    )
  }
}

//处理非路由组件引用不到路由组件的属性
export default withRouter(UserList)
