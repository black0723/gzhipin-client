/*
redux核心的管理对象的模块
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

//向外暴露state对象,两个参数
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
