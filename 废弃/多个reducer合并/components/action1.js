import { Add1, Del1 } from '../store/action-types'

function addHandle() {
  return { type: Add1 }
}
function delHandle() {
  return { type: Del1 }
}

const actions = {
  addHandle,
  delHandle
}

export default actions
