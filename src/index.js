import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import './app.css'  
import configureStore from './store/configureStore'

const STORE = configureStore();

render(
    <Provider store={STORE}>
        <App />
    </Provider>,
  document.getElementById('root')
)