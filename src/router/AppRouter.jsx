import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Area */}
        <Route path="/" element={<Home />} />

        {/* Private Area */}
        <Route element={<PrivateRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
