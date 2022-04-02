import { Add, Del } from '../store/action-types'

function addHandle() {
  return { type: Add }
}
function delHandle() {
  return { type: Del }
}

export {
  addHandle,
  delHandle
}
