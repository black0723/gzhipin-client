import React, {Component} from 'react'
import {Icon, List, NavBar, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
//获取法律法规
import {queryLawsOne} from '../../redux/actions'

const Item = List.Item

class LawsDetail extends Component {

  componentDidMount() {
    //接收传过来的URL参数
    const id = this.props.match.params.lawsid
    this.props.queryLawsOne(id)
  }

  render() {
    const {lawsOne} = this.props
    return (
      <div>
        <NavBar
          icon={<Icon type={'left'}/>}
          onLeftClick={() => this.props.history.goBack()}
          className={'sticky-header'}>
          法规详情
        </NavBar>
        <WhiteSpace/>
        <List className="my-list" style={{marginBottom: 48, marginTop: 35}}>
          {
            <Item
              className="news-title"
              wrap
              platform="android">
              {lawsOne.title}
            </Item>
          }
          {
            <Item
              multipleLine
              wrap
              className="news-detail">
              {lawsOne.content}
            </Item>
          }
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({
    lawsOne: state.lawsOne
  }), {
    queryLawsOne
  }
)(LawsDetail)

