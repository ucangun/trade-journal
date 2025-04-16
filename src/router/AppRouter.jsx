import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Area */}

        {/* Private Area */}
        <Route element={<PrivateRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
