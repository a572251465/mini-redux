import React from "react";
import { ReactReduxContext } from "react-redux/components/Context.js";
import { bindActionCreators } from "redux/bindActionCreators.js";

/**
 * react-redux 连接的核心组件/ 内部核心是类组件
 *
 * @author lihh
 * @param mapStateToProps 状态映射参数
 * @param mapDispatchToProps dispatch方法映射到参数
 * @return {(function(*))|*}
 */
// function connect(mapStateToProps, mapDispatchToProps) {
//   return function (OldComponent) {
//     return class extends React.Component {
//       // 表示redux 上下文
//       static contextType = ReactReduxContext;
//       constructor(props, context) {
//         super(props);
//         const { store } = context;
//         // 拿到状态/ 订阅函数/ 派发函数
//         const { getState, subscribe, dispatch } = store;
//         // 通过函数映射 拿到一个对应的状态
//         this.state = mapStateToProps(getState());
//         this.unsubscribe = subscribe(() => {
//           // 每次触发新的订阅 && 更新最新的状态
//           this.setState(mapStateToProps(getState()));
//         });
//
//         // 将dispatch 作为参数派发
//         let dispatchProps;
//         if (typeof mapDispatchToProps === "function") {
//           dispatchProps = mapDispatchToProps(dispatch);
//         } else if (typeof mapDispatchToProps === "object") {
//           dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
//         } else {
//           dispatchProps = { dispatch };
//         }
//         this.dispatchProps = dispatchProps;
//       }
//
//       componentWillUnmount() {
//         this.unsubscribe();
//       }
//
//       render() {
//         return (
//           <OldComponent
//             {...this.props}
//             {...this.state}
//             {...this.dispatchProps}
//           />
//         );
//       }
//     };
//   };
// }

/**
 * react-redux 连接的核心组件/ 内部核心是函数组件
 *
 * @author lihh
 * @param mapStateToProps 状态映射参数
 * @param mapDispatchToProps dispatch方法映射到参数
 * @return {(function(*))|*}
 */
export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return function (props) {
      const { store } = React.useContext(ReactReduxContext);
      const { getState, dispatch, subscribe } = store;

      const prevState = getState();
      const stateProps = React.useMemo(
        () => mapStateToProps(prevState),
        [prevState],
      );
      let dispatchProps = React.useMemo(() => {
        // 将dispatch 作为参数派发
        let dispatchProps;
        if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch);
        } else if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else {
          dispatchProps = { dispatch };
        }
        return dispatchProps;
      }, [dispatch]);

      // 目标为了强制更新的
      const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
      // useLayoutEffect 在更新之后 渲染之前执行
      React.useLayoutEffect(() => {
        return subscribe(forceUpdate);
      }, [subscribe]);

      return <OldComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  };
}
