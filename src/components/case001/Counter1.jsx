import { Component } from "react";
import store from "@/store/index.js";
import { bindActionCreators } from "redux/bindActionCreators.js";
import actions from "@/store/actions/counter1.js";

const boundActions = bindActionCreators(actions, store.dispatch);
export default class Counter extends Component {
  unsubscribe;
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().counter1.number }),
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>+{" "}
        <button onClick={boundActions.add1}>+</button>+{" "}
        <button onClick={boundActions.minus1}>-</button>
      </div>
    );
  }
}
