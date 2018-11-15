import React, {Component} from 'react'
import {List, WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
//处理非路由组件引用不到路由组件的属性
//import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

//获取新闻
import {getNewsList} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class News extends Component {

  componentDidMount() {
    console.log('News componentDidMount...')
    this.props.getNewsList()
    console.log('this.props.news', this.props.news)
  }

  render() {
    const {news} = this.props
    return (
      <div>
        <WhiteSpace/>
        <List className="my-list" style={{marginBottom: 48, marginTop: 35}}>
          <QueueAnim type={'top'} delay={500}>
            {
              news.map((o, index) => (
                <Item key={index}
                      arrow="horizontal"
                      multipleLine
                      onClick={() => {
                        console.log(o.id)
                        this.props.history.push(`/newsdetail/${o.id}`)
                      }}
                      platform="android">
                  {o.title}
                  <Brief>{o.content}</Brief>
                </Item>
              ))
            }
          </QueueAnim>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({
    news: state.news
  }), {
    getNewsList
  }
)(News)

