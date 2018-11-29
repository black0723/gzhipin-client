/**
 * 个人中心主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Toast, NavBar, Picker, TextareaItem, InputItem, Radio} from 'antd-mobile'
import Cookies from 'js-cookie'

import {district} from '../../assets/index'
import Header from '../../components/header/header'
import {updateUser} from '../../redux/actions'

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

class PersonalInfoBoss extends Component {

  state = {
    username:'',
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

  componentDidMount() {
    const {username,info,header,category1,category2,example,salary,winrate,company,post,category} = this.props.user
    this.setState({
      username,
      info,
      header,
      pickerValue: [category1,category2],
      category,
      example,salary,winrate,company,post
    });

  }

  handlerChange = (name, val) => {
    console.log('name-val',name,val)
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
    const user = this.state
    user.category1 = this.state.pickerValue[0]
    user.category2 = this.state.pickerValue[1]
    console.log(this.props.user.header)
    if(this.state.header==''){
      user.header=this.props.user.header
    }
    console.log(user)
    this.props.updateUser(user)
    Toast.success('保存成功', 3);
  }

  render() {
    const {username,info,header,example,salary,winrate,company,post} = this.props.user
    return (
      <div style={{marginBottom:60}}>
        <NavBar>完善顾客个人信息</NavBar>
        {
          header?
            <p style={{paddingLeft:15}}>
              原头像：
              <img src={require(`../../assets/images/headers/${header}.png`)}/></p>
            :null
        }

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
        <InputItem defaultValue={username} placeholder={"请输入用户名"} onChange={(o) => this.handerChange('username', o)}>用户名</InputItem>
        <WhiteSpace/>
        <InputItem defaultValue={post} placeholder={"律师证信息"} onChange={val => this.handlerChange('post', val)} >律师证信息</InputItem>
        <WhiteSpace/>
        <InputItem defaultValue={company} placeholder={"律师所信息"} onChange={val => this.handlerChange('company', val)}>律师所信息</InputItem>
        <WhiteSpace/>
        <InputItem defaultValue={winrate} placeholder={"律师胜率"} onChange={val => this.handlerChange('winrate', val)}>律师胜率</InputItem>
        <WhiteSpace/>
        <InputItem defaultValue={salary} placeholder={"收费要求"} onChange={val => this.handlerChange('salary', val)}>收费要求</InputItem>
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
        <InputItem defaultValue={example} placeholder={"胜诉案例"} onChange={val => this.handlerChange('example', val)}>胜诉案例</InputItem>
        <WhiteSpace/>
        <TextareaItem defaultValue={info} placeholder={"个人简介"} title={"个人简介"} rows={3} onChange={val => this.handlerChange('info', val)}/>
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
)(PersonalInfoBoss)
