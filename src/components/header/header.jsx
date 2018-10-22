import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  List,
  Grid
} from 'antd-mobile'

export default class Header extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  //选择之后显示的头像
  state = {
    icon: null
  }

  constructor(props) {
    super(props)
    this.hearderData = []
    for (let i = 1; i <= 20; i++) {
      this.hearderData.push({
        text: '头像' + i,
        icon: require(`../../assets/images/headers/头像${i}.png`)
      })
    }
  }

  handerHeader = ({text, icon}, index) => {
    //1.更新当前组件的state状态
    this.setState({
      icon
    })
    //2.调用函数更新 父组件 的状态
    this.props.setHeader(text)
  }

  render() {
    const HeaderText = !this.state.icon? '请选择头像':(
      <div>
        已选择头像：<img src={this.state.icon}/>
      </div>
    )

    return (
      <List renderHeader={() => HeaderText}>
        <Grid data={this.hearderData} columnNum={5} onClick={this.handerHeader}/>
      </List>
    )
  }
}
