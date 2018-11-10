/**
 * Boss主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Boss extends Component {

  //在此发送请求，获取用户信息
  componentDidMount() {
    console.log('Boss componentDidMount() ',this.props.userList)
    this.props.getUserList('boss')
  }

  render() {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}

export default connect(
  state => ({
    userList: state.userList
  }), {
    getUserList
  }
)(Boss)
