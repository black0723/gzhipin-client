import React, {Component} from 'react'
import {
  NavBar,
  InputItem,
  WhiteSpace,
  TextareaItem,
  Button
} from 'antd-mobile'

import Header from '../../components/header/header'

export default class JobInfo extends Component {
  state = {
    header: '',
    post: '',
    info: ''
  }

  handerChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  //Header组件选择头像后，更新状态，并显示已选择的头像
  setHeader=(header)=>{
    this.setState({
      header
    })
  }

  save=()=>{
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <NavBar>Job个人信息</NavBar>
        <Header setHeader={this.setHeader}/>
        <InputItem placeholder={"求职岗位"} onChange={val=>this.handerChange('post',val)}/>
        <WhiteSpace/>
        <TextareaItem placeholder={"个人介绍"} rows={3} onChange={val=>this.handerChange('info',val)}/>
        <WhiteSpace/>
        <Button type='primary' onClick={this.save}>保存</Button>
      </div>
    )
  }
}
