import React, {Component} from 'react'
import {List, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
//处理非路由组件引用不到路由组件的属性
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

//获取新闻
import {getNewsList} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class News extends Component {

  componentDidMount(){
    console.log('News componentDidMount...')
    this.props.getNewsList()
    console.log('this.props.news',this.props.news)
  }

  render() {
    return (
      <div>
        <WhiteSpace/>
        <List className="my-list" style={{marginBottom: 48, marginTop: 35}}>
          <QueueAnim type={'top'} delay={500}>
          <Item
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>

          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {
            }}
            platform="android"
          >
            ListItem （Android）<Brief>There may have water ripple effect of <br/> material if you set the click
            event.</Brief>
          </Item>
          </QueueAnim>
        </List>
      </div>
    )
  }
}

export default connect(
  state =>({
    news: state.news
  }),{
    getNewsList
  }
)(News)

