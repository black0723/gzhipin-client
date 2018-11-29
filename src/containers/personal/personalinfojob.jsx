/**
 * 个人中心主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Toast, NavBar, Picker, TextareaItem, InputItem} from 'antd-mobile'
import Cookies from 'js-cookie'

import {district} from '../../assets/index'
import Header from '../../components/header/header'
import {updateUser} from '../../redux/actions'

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

class PersonalInfoJob extends Component {

  state = {
    username:'',
    header: '',
    exampletype: '',
    info: '',
    visible: false,
    data: [],
    cols: 2,
    pickerValue: [],
  }

  componentDidMount() {
    const {username,info,category1,category2,header} = this.props.user
    this.setState({
      username,
      info,
      header,
      pickerValue: [category1,category2]
    });
  }

  handerChange = (name, val) => {
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
    const {username,info,header} = this.props.user
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
        <TextareaItem defaultValue={info} placeholder={"个人简介"} title={"个人简介"} rows={3} onChange={val => this.handerChange('info', val)}/>
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
)(PersonalInfoJob)
