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

const ListItem = List.Item

class BossInfo extends Component {

  state = {
    header: '',
    info: '',
    post: '', //律师证件信息
    company: '', //律师所
    winrate: '',
    salary: '',
    category: '主任',
    example: ''
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
    console.log(this.state)
    this.props.updateUser(this.state)
  }

  render() {
    const {header, usertype} = this.props.user
    if (header) {
      //有值，说明已经完善了，重定向
      const path = usertype === 'boss' ? '/boss' : '/job'
      return <Redirect to={path}/>
    }

    const seasons = [
      [
        {
          label: '一般民事案件',
          value: '一般民事案件',
        },
        {
          label: '一般刑事案件',
          value: '一般刑事案件',
        },
        {
          label: '知识产权案件',
          value: '知识产权案件',
        },
        {
          label: '行政案件',
          value: '行政案件',
        },
        {
          label: '公司案件',
          value: '公司案件',
        },
      ]
    ]

    const seasons2 = [
      [
        {
          label: '经济债务咨询', value: '经济债务咨询',
        },
        {
          label: '财产纠纷咨询', value: '财产纠纷咨询',
        },
        {
          label: '婚姻家事咨询', value: '婚姻家事咨询',
        },
        {
          label: '房产合同咨询', value: '房产合同咨询',
        },
        {
          label: '合同纠纷咨询', value: '合同纠纷咨询',
        },
        {
          label: '交通赔偿咨询', value: '交通赔偿咨询',
        },
//
        {
          label: '刑事诉讼咨询', value: '刑事诉讼咨询',
        },
        {
          label: '取保候审咨询', value: '取保候审咨询',
        },

        //
        {
          label: '商标案件', value: '商标案件',
        },
        {
          label: '专利案件', value: '专利案件',
        },
        {
          label: '著作权案件', value: '著作权案件',
        },

        //
        {
          label: '行政案件咨询', value: '行政案件咨询',
        },

        //
        {
          label: '公司法务咨询', value: '公司法务咨询',
        },
        {
          label: '劳动纠纷咨询', value: '劳动纠纷咨询',
        },
        {
          label: '公司注册咨询', value: '公司注册咨询',
        },
        {
          label: '债权债务咨询', value: '债权债务咨询',
        }
      ]
    ]

    return (
      <div>
        <NavBar>完善律师个人信息</NavBar>
        <Header setHeader={this.setHeader}/>
        <Picker
          data={seasons}
          title="案件类型选择"
          cascade={false}
          extra="请选择"
          value={this.state.sValue}
          onChange={v => {
            this.setState({sValue: v})
          }}
          onOk={v => this.setState({sValue: v})}>
          <List.Item arrow="horizontal">案件类型大类</List.Item>
        </Picker>
        <WhiteSpace/>
        <Picker
          data={seasons2}
          title="案件类型选择"
          cascade={false}
          extra="请选择"
          value={this.state.sValue2}
          onChange={v => this.setState({sValue2: v})}
          onOk={v => this.setState({sValue2: v})}>
          <List.Item arrow="horizontal">案件类型小类</List.Item>
        </Picker>
        <WhiteSpace/>
        <InputItem placeholder={"律师证信息"} onChange={val => this.handlerChange('post', val)}>律师证信息</InputItem>
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
