import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  NavBar,
  InputItem,
  WhiteSpace,
  TextareaItem,
  Button
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Header from '../../components/header/header'
import {updateUser} from '../../redux/actions'

class JobInfo extends Component {
  state = {
    header: '',
    exampletype: '',
    info: ''
  }

  handerChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  //Header组件选择头像后，更新状态，并显示已选择的头像
  setHeader = (header) => {
    this.setState({
      header
    })
  }

  save = () => {
    //console.log(this.state)
    this.props.updateUser(this.state)
  }

  render() {
    const {header,usertype}=this.props.user
    if(header){
      const path = usertype==='boss'?'/boss':'/job'
      return <Redirect to={path}/>
    }


    return (
      <div>
        <NavBar>完善顾客个人信息</NavBar>
        <Header setHeader={this.setHeader}/>
        <InputItem placeholder={"案例类型"} onChange={val => this.handerChange('exampletype', val)}>案例类型</InputItem>
        <WhiteSpace/>
        <TextareaItem placeholder={"个人简介"} title={"个人简介"} rows={3} onChange={val => this.handerChange('info', val)}/>
        <WhiteSpace/>
        <Button type='primary' onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({
    user:state.user
  }), {
    updateUser
  }
)(JobInfo)
