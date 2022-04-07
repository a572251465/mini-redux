import { shallowEqual } from '../shallowEqual'
import ReactReduxContext from '../ReactReduxContext'
import { useContext, useLayoutEffect, useReducer, useRef } from 'react'

function useSelector(selector, equalityFn = shallowEqual) {
  const { store } = useContext(ReactReduxContext)
  const lastSelectedState = useRef(null)

  const state = store.getState()
  const selectedState = selector(state)

  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  useLayoutEffect(
    () =>
      store.subscribe(() => {
        //比较老状态和新选中状态是否相等，如果相等，不刷新
        let selectedState = selector(store.getState())
        if (!equalityFn(lastSelectedState.current, selectedState)) {
          forceUpdate()
          lastSelectedState.current = selectedState
        }
      }),
    []
  )

  return selectedState
}

export default useSelector
