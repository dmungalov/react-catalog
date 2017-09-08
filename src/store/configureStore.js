import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()
const middleware = routerMiddleware(history)

export function configureStore(initialState) {
    const logger = createLogger()

    const store = createStore( 
        rootReducer, 
        initialState,
        applyMiddleware(middleware, thunk)
    );
    
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    
    return store;
}