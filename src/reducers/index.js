import { combineReducers } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import filter from './filter'
import cart from './cart'
import app from './app'

export default combineReducers({
  app,
  filter,
  cart,
  router: routerReducer
})