import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  NavBar,
  WhiteSpace,
  TextareaItem,
  Button,
  Picker,
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
//import { district, provinceLite } from 'antd-mobile-demo-data';
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

class JobInfo extends Component {

  state = {
    header: '',
    exampletype: '',
    info: '',
    visible: false,
    data: [],
    cols: 2,
    pickerValue: [],
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
    const user = this.state
    console.log(this.state.pickerValue)
    user.category1 = this.state.pickerValue[0]
    user.category2 = this.state.pickerValue[1]
    this.props.updateUser(user)
  }

  render() {
    const {header, usertype} = this.props.user
    if (header) {
      const path = usertype === 'boss' ? '/boss' : '/job'
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>完善顾客个人信息</NavBar>
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
        <TextareaItem placeholder={"个人简介"} title={"个人简介"} rows={3} onChange={val => this.handerChange('info', val)}/>
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
)(JobInfo)
