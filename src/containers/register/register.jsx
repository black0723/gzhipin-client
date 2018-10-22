/**
 * 注册路由组件
 */
import React, {Component} from 'react';
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button,
  Modal
} from 'antd-mobile'

/*
1.ui组件包装成容器组件 发送请求到后台
  #引入connect
  #引入action
  #暴露export default connect()(Register)
  #点击按钮发送请求(从props里取出方法)this.props.register(this.state)
 */

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {

  state = {
    //收集表单数据
    username: '',
    password: '',
    password2: '',
    usertype: 'boss'
  }

  //input的值改变时触发,修改对应的状态
  changeHandler = (propName, value) => {
    //更新状态
    this.setState({
      [propName]: value
    })
  }

  /**
   * 注册按钮
   */
  register = () => {
    //console.log(this.state)
    //调用接口
    this.props.register(this.state)
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    let {msg, redirectTo} = this.props.user
    console.log(this.props.user)
    if (redirectTo) {
      //重定向到指定的路由
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className={"error-msg"}>{msg}</div> : null}
            <InputItem placeholder={"请输入用户名"} onChange={(o) => this.changeHandler('username', o)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem placeholder={"请输入密码"} type='password'
                       onChange={(o) => this.changeHandler('password', o)}>密&nbsp;&nbsp;&nbsp;码</InputItem>
            <WhiteSpace/>
            <InputItem placeholder={"请输入确认密码"} type='password'
                       onChange={(o) => this.changeHandler('password2', o)}>确认密码</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.usertype === 'job'}
                     onChange={(o) => this.changeHandler('usertype', 'job')}>求职者</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.usertype === 'boss'}
                     onChange={(o) => this.changeHandler('usertype', 'boss')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账号</Button>
            <WhiteSpace/>
          </List>
        </WingBlank>
      </div>
    );
  }
}

//向外暴露
export default connect(
  state => ({
    user: state.user
  }),
  {register}
)(Register)
