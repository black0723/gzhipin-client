import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  NavBar,
  InputItem,
  WhiteSpace,
  TextareaItem,
  Button, Radio, List, Picker
} from 'antd-mobile'

import {Redirect} from 'react-router-dom'

import Header from '../../components/header/header'
import {updateUser} from '../../redux/actions'
import {district} from '../../assets/index'

const ListItem = List.Item

// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{backgroundColor: '#fff', paddingLeft: 15}}
  >
    <div className="test" style={{display: 'flex', height: '45px', lineHeight: '45px'}}>
      <div style={{flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{props.children}</div>
      <div style={{textAlign: 'right', color: '#888', marginRight: 15}}>{props.extra}</div>
    </div>
  </div>
);

class BossInfo extends Component {

  state = {
    header: '',
    info: '',
    post: '', //律师证件信息
    company: '', //律师所
    winrate: '',
    salary: '',
    category: '主任',
    example: '',
    pickerValue: [],
  }

  //更新头像，交给header组件调用
  setHeader = (header) => {
    this.setState({header})
  }

  handlerChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  save = () => {
    const user = this.state
    user.category1 = this.state.pickerValue[0]
    user.category2 = this.state.pickerValue[1]
    this.props.updateUser(this.state)
  }

  render() {
    const {header, usertype} = this.props.user
    if (header) {
      //有值，说明已经完善了，重定向
      const path = usertype === 'boss' ? '/boss' : '/job'
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>完善律师个人信息</NavBar>
        <Header setHeader={this.setHeader}/>
        <Picker
          title="案件类型选择"
          extra="请选择"
          data={district}
          value={this.state.pickerValue}
          onChange={v => {
            this.setState({pickerValue: v})
          }}
          onOk={v => this.setState({pickerValue: v})}
        >
          <CustomChildren>案件类型选择</CustomChildren>
        </Picker>
        <WhiteSpace/>
        <InputItem placeholder={"律师证信息"} onChange={val => this.handlerChange('post', val)} >律师证信息</InputItem>
        <WhiteSpace/>
        <InputItem placeholder={"律师所信息"} onChange={val => this.handlerChange('company', val)}>律师所信息</InputItem>
        <WhiteSpace/>
        <InputItem placeholder={"律师胜率"} onChange={val => this.handlerChange('winrate', val)}>律师胜率</InputItem>
        <WhiteSpace/>
        <InputItem placeholder={"收费要求"} onChange={val => this.handlerChange('salary', val)}>收费要求</InputItem>
        <WhiteSpace/>
        <ListItem>
          <span>律师类型</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Radio checked={this.state.category === '主任'}
                 onChange={(o) => this.handlerChange('category', '主任')}>主任</Radio>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Radio checked={this.state.category === '专业'}
                 onChange={(o) => this.handlerChange('category', '专业')}>专业</Radio>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Radio checked={this.state.category === '一般'}
                 onChange={(o) => this.handlerChange('category', '一般')}>一般</Radio>
        </ListItem>
        <WhiteSpace/>
        <InputItem placeholder={"胜诉案例"} onChange={val => this.handlerChange('example', val)}>胜诉案例</InputItem>
        <WhiteSpace/>
        <TextareaItem placeholder={"个人简介"} title={"个人简介"} rows={3} onChange={val => this.handlerChange('info', val)}/>
        <WhiteSpace/>
        <Button type='primary' onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }), {
    updateUser
  }
)(BossInfo)
