/**
 * 主路由组件
 */
import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import BossInfo from '../../containers/bossinfo/bossinfo'
import JobInfo from '../../containers/jobinfo/jobinfo'
import Boss from '../boss/boss'
import Job from '../job/job'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import News from '../../containers/news/news'
import Laws from '../../containers/laws/laws'
import NewsDetail from '../../containers/news/newsdetail'
import LawsDetail from '../../containers/laws/lawsdetail'

import {redirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {
  //不加static 给组件对象添加属性，加static给组件类添加
  navList = [
    {
      path: '/boss', //
      component: Job,
      title: '顾客列表',
      icon: 'dashen',
      text: '顾客',
    },
    {
      path: '/job', //
      component: Boss,
      title: '律师列表',
      icon: 'laoban',
      text: '律师',
    },
    {
      path: '/laws', //
      component: Laws,
      title: '法律法规速查',
      icon: 'laws',
      text: '法规',
    },
    {
      path: '/news', //
      component: News,
      title: '法律新闻',
      icon: 'news',
      text: '新闻',
    },
    {
      path: '/message', //
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', //
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  componentDidMount() {
    console.log('main componentDidMount()')
    //登录过（cookie中有userid），但还没有登录（redux管理的user中没有id），
    // 在componentDidMount()中发请求获取登录的user
    const userid = Cookies.get('userid')
    const {id} = this.props.user
    if (userid && !id) {
      console.log('发送ajax获取user的信息')
      this.props.getUser()
    }
  }

  render() {

    //检查用户是否登陆，如果没登陆自动重定向到登陆界面
    //检查redux管理的user
    // const {user}=this.props
    // if(!user.id){
    //   return <Redirect to={'/login'}/>
    // }
    //2.读取cookie中userid
    const userid = Cookies.get('userid')
    //如果没有，自动跳转到登录
    if (!userid) {
      return <Redirect to={'/login'}/>
    }
    //如果有，读取redux中的user
    const {user, unReadCount} = this.props
    //如果user中没有id，返回null（不做任何显示）
    console.log('读取redux中的user = ', user)
    if (!user.id) {
      return null
    } else {
      //如果user中有id，显示对应的界面
      //（如果请求根路径，根据user的usertype和header来判断跳转到哪）
      let path = this.props.location.pathname
      if (path === '/') {
        //得到重定向的路由
        path = redirectTo(user.usertype, user.header)
        return <Redirect to={path}/>
      }
    }

    //取出导航
    const {navList} = this
    //当前路径
    const path = this.props.location.pathname
    //得到当前的nav可能不存在
    const curentNav = navList.find(nav => nav.path === path)
    let isFooter= false
    if(path.startsWith('/newsdetail')){
      isFooter=true
    }
    if(path.startsWith('/lawsdetail')){
      isFooter=true
    }

    //判断哪个路由被隐藏
    if (curentNav) {
      //决定哪个路由需要隐藏
      if (user.usertype === 'boss') {
        this.navList[1].hide = true
      }
      else {
        this.navList[0].hide = true
      }
    }

    return (
      <div>
        {curentNav ? <NavBar className={'sticky-header'}>{curentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map((nav, index) => <Route key={index} path={nav.path} component={nav.component}/>)
          }
          <Route path={"/bossinfo"} component={BossInfo}/>
          <Route path={"/jobinfo"} component={JobInfo}/>
          {/*路径  /chat/userid */}
          <Route path={"/chat/:userid"} component={Chat}/>
          <Route path={"/newsdetail/:newsid"} component={NewsDetail}/>
          <Route path={"/lawsdetail/:lawsid"} component={LawsDetail}/>
          <Route component={NotFound}/>
        </Switch>
        {(curentNav || isFooter)? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
    unReadCount: state.chat.unReadCount
  })
  , {getUser}
)(Main)

/*
实现自动登录
  1.componentDidMount()
    1).登录过（cookie中有userid），但还没有登录（redux管理的user中没有id），在componentDidMount()中发请求获取登录的user
  2.render()
    1).如果cookie没有userid，自动跳转到login界面
    2).再判断redux里的user是不是有id,如果没有，（发请求期间）暂时不做任何显示
    3).如果redux里的user有id显示对应的界面
    4).如果请求根路径，根据user的usertype和header来判断跳转到哪
 */
