/*
入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'
//引入管理state
import {Provider} from 'react-redux'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'
import store from './redux/store'

import './assets/css/index.less'

//引入socketio的js，进行测试
//import './test/socketio_test'

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route component={Main}></Route>
        </Switch>
      </HashRouter>
    </Provider>
  )
  , document.getElementById('root'))
