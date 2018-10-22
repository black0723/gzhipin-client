/**
 * 主路由组件
 */
import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'

import BossInfo from '../../containers/bossinfo/bossinfo'
import JobInfo from '../../containers/jobinfo/jobinfo'

export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path={"/bossinfo"} component={BossInfo}/>
          <Route path={"/jobinfo"} component={JobInfo}/>
        </Switch>
      </div>
    );
  }
}
