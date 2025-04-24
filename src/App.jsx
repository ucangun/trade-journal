import { Provider } from "react-redux";
import store from "./app/store";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
