/**
 * 底部导航主界面路由容器组件
 */
import React, {Component} from 'react'
import {Badge, TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired  //接收main组件传来的未读数量
  }

  render() {

    // nav.hide = true/false hide代 表 当 前 项 应 该 被 隐 藏
    //接收
    let {navList, unReadCount} = this.props
    //过滤掉需要隐藏的导航路由
    navList = navList.filter(nav => !nav.hide)

    //回调函数返回值为 true,当前元素就会留下 ,否则不留
    //当前请求的路径
    //this.props.location.pathname
    //在非路由组件中使用路由组件中的api,使用路由组件提供的函数withRouter
    const path = this.props.location.pathname
    return (
      <TabBar>
        {
          navList.map((nav, index) => (
            <Item
              key={nav.path}
              badge={nav.path === '/message' ? unReadCount : 0}
              title={nav.text}
              icon={{uri: require(`./images/nav/${nav.icon}.png`)}}
              selectedIcon={{uri: require(`./images/nav/${nav.icon}-selected.png`)}}
              selected={path === nav.path}
              onPress={() => {
                this.props.history.replace(nav.path)
              }}
            />
          ))
        }
      </TabBar>
    )
  }
}

//让非路由组件可以访问到路由组件的API,使用withRouter
//内部会向组件中传入路由组件的的东西，
export default withRouter(NavFooter)


