import { combineReducers } from '../../redux'
import counter from './counter'
import counter1 from './counter1'

export default combineReducers({
  counter,
  counter1
})
