import Counter1 from "@/components/Counter1.jsx";
import Counter2 from "@/components/Counter2.jsx";
import { Provider } from "react-redux";
import store from "@/store";

function App() {
  return (
    <Provider store={store}>
      <Counter1 />
      <Counter2 />
    </Provider>
  );
}

export default App;
