import React from "react";
import { connect } from "react-redux/components/index.js";
import actions from "@/used/01/store/actions/counter2.js";

class Counter2Comp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    const { number, add2, minus2 } = this.props;
    return (
      <div>
        <h1>这是 counter2 组件</h1>
        {number}
        <button onClick={add2}>+++</button>
        <button onClick={minus2}>---</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.counter2;
export default connect(mapStateToProps, actions)(Counter2Comp);
