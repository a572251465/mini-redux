import { Add, Del } from '../store/action-types'

function addHandle() {
  return { type: Add }
}
function delHandle() {
  return { type: Del }
}

const actions = {
  addHandle,
  delHandle
}

export default actions
