import React from 'react'
import ReactDom from 'react-dom'

import Counter from './components/Counter'
import Counter1 from './components/Counter1'
import store from './store'
import { Provider } from './react-redux'

ReactDom.render(
  <Provider store={store}>
    <Counter />
    <Counter1 />
  </Provider>,
  document.getElementById('root')
)
