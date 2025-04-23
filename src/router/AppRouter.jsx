import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import StockDetail from "../pages/StockDetail";
import Stocks from "../pages/Stocks";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Area */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        {/* Private Area */}
        <Route element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/stocks/:id" element={<StockDetail />} />
          <Route path="/all-stocks" element={<Stocks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
