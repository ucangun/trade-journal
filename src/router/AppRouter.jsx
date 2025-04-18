import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Area */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        {/* Private Area */}
        <Route element={<PrivateRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
