/**
 * 个人中心主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal, WingBlank} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
  //退出登录
  logout = () => {
    console.log('logout')
    Modal.alert('退出', '确定要退出登录吗？', [
      {
        text: '取消',
        onPress:()=>{
          console.log('取消退出')
        }
      }, {
        text: '确定',
        onPress: () => {
          //清除cookie中的userid
          Cookies.remove('userid')
          //干掉redux中的user
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {
      header, usertype, username, company,category1,category2,
      post, winrate, salary, category, example, info,id
    } = this.props.user
    return (
      <div style={{marginBottom:55,marginTop:45}}>
        <Result img={<img src={require(`../../assets/images/headers/${header}.png`)}
                          style={{width: 50}} alt="header"/>}
                title={`${username}(${usertype==='boss'?'律师':'顾客'})`} message={company}/>
        <List renderHeader={() => '相关信息'}>
          {usertype==='boss'?
            <Item
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(`/personalinfoboss`)
              }}
              multipleLine>
              <Brief>律师证信息: {post}</Brief>
              <Brief>律师胜率: {winrate}</Brief>
              <Brief>收费要求: {salary}</Brief>
              <Brief>律师类型: {category}</Brief>
              {example ? <Brief>胜诉案例: {example}</Brief> : null}
              <Brief>案例类型: {category1}</Brief>
              <Brief>案例类型: {category2}</Brief>
              <Brief>个人简介: {info}</Brief>
            </Item>
            :
            <Item
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(`/personalinfojob`)
              }}
              multipleLine>
              <Brief>案例类型: {category1}</Brief>
              <Brief>案例类型: {category2}</Brief>
              <Brief>个人简介: {info}</Brief>
            </Item>
          }

        </List>
        <WhiteSpace/> <
        List>
        <Button type='warning' onClick={this.logout}>退出登录</Button>
      </List>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }), {
    resetUser
  }
)(Personal)
