import "./App.css";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <h1>Trade Journal</h1>
      </Provider>
    </>
  );
}

export default App;
