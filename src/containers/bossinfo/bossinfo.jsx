import React, {Component} from 'react'

import {
  NavBar,
  InputItem,
  WhiteSpace,
  TextareaItem,
  Button
} from 'antd-mobile'

import Header from '../../components/header/header'

export default class BossInfo extends Component {

  state = {
    header: '',
    info: '',
    post: '', //职位
    company: '',
    salary: ''
  }

  handlerChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  render() {
    return (
      <div>
        <NavBar>Boss个人信息</NavBar>
        <Header/>
        <InputItem placeholder={"招聘职位"} onChange={val => this.handlerChange('post', val)}>招聘职位</InputItem>
        <WhiteSpace/>
        <InputItem placeholder={"公司名称"} onChange={val => this.handlerChange('company', val)}>公司名称</InputItem>
        <WhiteSpace/>
        <InputItem placeholder={"职位薪资"} onChange={val => this.handlerChange('salary', val)}>职位薪资</InputItem>
        <WhiteSpace/>
        <TextareaItem placeholder={"职位要求"} title={"职位要求"} rows={3} onChange={val => this.handlerChange('info', val)}/>
        <WhiteSpace/>
        <Button type='primary'>保存</Button>
      </div>
    )
  }
}
