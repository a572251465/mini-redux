import { createStore } from "redux/createStore.js";
import { Component } from "react";
import { bindActionCreators } from "redux/bindActionCreators.js";

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
const addCreator = () => ({ type: Types.ADD });
const minusCreator = () => ({ type: Types.MINUS });

const boundActions = bindActionCreators(
  {
    add: addCreator,
    minus: minusCreator,
  },
  store.dispatch,
);

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
        <button onClick={boundActions.add}>add</button>
        <button onClick={boundActions.minus}>minus</button>
      </div>
    );
  }
}
