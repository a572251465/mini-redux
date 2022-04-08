import React from 'react'
import ReactDom from 'react-dom'

import Counter from './components/Counter'
import store from './store'
import { Provider } from './react-redux'

ReactDom.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)
