import React, {Component} from 'react'
import {Icon, List, NavBar, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
//获取新闻
import {queryNewsOne} from '../../redux/actions'

const Item = List.Item

class NewsDetail extends Component {

  componentDidMount() {
    //接收传过来的URL参数
    const newsid = this.props.match.params.newsid
    this.props.queryNewsOne(newsid)
  }

  render() {
    const {newsOne} = this.props
    return (
      <div>
        <NavBar
          icon={<Icon type={'left'}/>}
          onLeftClick={() => this.props.history.goBack()}
          className={'sticky-header'}>
          新闻详情
        </NavBar>
        <WhiteSpace/>
        <List className="my-list" style={{marginBottom: 48, marginTop: 35}}>
          {
            <Item
              className="news-title"
              wrap
              platform="android">
              {newsOne.title}
            </Item>
          }
          {
            <Item
              multipleLine
              wrap
              className="news-detail">
              {newsOne.content}
            </Item>
          }
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({
    newsOne: state.newsOne
  }), {
    queryNewsOne
  }
)(NewsDetail)

