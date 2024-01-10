import { createStore } from "redux/createStore.js";
import { Component } from "react";

const Types = { ADD: "ADD", MINUS: "MINUS" };
const initState = { number: 0 };

/**
 * 表示reducer 动作
 *
 * @author lihh
 * @param state state状态
 * @param action action动作
 * @return {{number: number}}
 */
function reducer(state = initState, action) {
  switch (action.type) {
    case Types.ADD:
      return { number: state.number + 1 };
    case Types.MINUS:
      return { number: state.number - 1 };
    default:
      return state;
  }
}

// 创建一个store
const store = createStore(reducer, initState);

export default class Counter extends Component {
  unsubscribe;

  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().number }),
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => store.dispatch({ type: Types.ADD })}>add</button>
        <button onClick={() => store.dispatch({ type: Types.MINUS })}>
          minus
        </button>
      </div>
    );
  }
}
