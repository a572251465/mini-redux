import React from 'react'
import ReactDom from 'react-dom'

import Counter from './components/Counter'
import Counter1 from './components/Counter1'

ReactDom.render(
  <React.Fragment>
    <Counter />
    <Counter1 />
  </React.Fragment>,
  document.getElementById('root')
)
