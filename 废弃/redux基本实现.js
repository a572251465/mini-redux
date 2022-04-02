import React from 'react'
import { createStore } from './redux'

const addBtn = document.getElementById('add')
const delBtn = document.getElementById('del')
const countValue = document.getElementById('count-value')
const store = createStore(reducer)

addBtn.addEventListener('click', () => {
  store.dispatch({ type: 'add' })
})

delBtn.addEventListener('click', () => {
  store.dispatch({ type: 'del' })
})

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 }
    case 'del':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function render() {
  countValue.innerText = store.getState().count
}

store.subscribe(render)

render()
