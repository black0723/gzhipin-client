/**
 * Job主界面路由容器组件
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Job extends Component{

  componentDidMount(){
    console.log('componentDidMount() job',this.props.userList)
    this.props.getUserList('job')
  }

  render(){
    const {userList} = this.props
    return (
      <UserList userList={userList}/>
    )
  }
}

export default connect(
  state =>({
    userList:state.userList
  }),{
    getUserList
  }
)(Job)
