import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  NavBar,
  InputItem,
  WhiteSpace,
  TextareaItem,
  Button,
  Picker,
  List
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Header from '../../components/header/header'
import {updateUser} from '../../redux/actions'

class JobInfo extends Component {

  state = {
    header: '',
    exampletype: '',
    info: '',
    sValue: ['一般民事案件'],
    sValue2: ['经济债务咨询'],
    visible: false
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
    user.category1=user.sValue[0]
    user.category2=user.sValue2[0]
    this.props.updateUser(user)
  }


  render() {
    const {header, usertype} = this.props.user
    if (header) {
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
        <NavBar>完善顾客个人信息</NavBar>
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
        <InputItem placeholder={"案例类型"} onChange={val => this.handerChange('exampletype', val)}>案例类型</InputItem>
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
