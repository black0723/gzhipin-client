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

  render() {
    return (
      <div>
        <NavBar>Job个人信息</NavBar>
        <Header/>
        <InputItem placeholder={"求职岗位"} onChange={val=>this.handerChange('header',val)}/>
        <WhiteSpace/>
        <TextareaItem placeholder={"个人介绍"} rows={3} onChange={val=>this.handerChange('info',val)}/>
        <WhiteSpace/>
        <Button type='primary'>保存</Button>
      </div>
    )
  }
}
