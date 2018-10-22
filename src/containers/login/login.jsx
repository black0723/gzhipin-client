/**
 * 登录路由组件
 */
import React, {Component} from 'react';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  InputItem,
  List,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";

import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  login = () => {
    //console.log(this.state)
    this.props.login(this.state)
  }

  //输入时更新状态
  changeHandler = (propName, value) => {
    //更新状态
    this.setState({
      [propName]: value
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
    console.log(this.props.user)
    let {msg, redirectTo} = this.props.user1

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
            <InputItem placeholder={"请输入用户名"} onChange={value => {
              this.changeHandler('username', value)
            }}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem placeholder={"请输入密码"} type={"password"} onChange={value => {
              this.changeHandler('password', value)
            }}>密&nbsp;&nbsp;&nbsp;码</InputItem>
            <WhiteSpace/>
            <Button type={"primary"} onClick={this.login}>登陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账号</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({
    //props 取值
    user1: state.user
  }), {
    login
  }
)(Login)

/*
ajax
redux
component
 */
