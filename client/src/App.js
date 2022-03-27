import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AddRoundedCart from "./pages/dashboard/AddRoundedCart";
import ViewCart from "./pages/dashboard/ViewCart";
import Rounding from "./pages/dashboard/Rounding";
import Manage from "./pages/dashboard/Manage";
import Users from "./pages/dashboard/Users";
import ViewUserPage from "./pages/dashboard/ViewUserPage";
import CreateUser from "./pages/dashboard/CreateUser";
import ManagerRoundingView from "./pages/dashboard/ManagerRoundingView";
import PDFCartReport from "./pages/dashboard/PDFCartReport";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Bitracker created by Nathan White

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path={``} element={<DashboardHome />} />
        // ** Rounding Module Paths **
        <Route path={`rounding`} element={<Rounding />} />
        <Route path={`rounding/add_new_cart`} element={<AddRoundedCart />} />
        <Route path={`rounding/cart_view`} element={<ViewCart />} />
        // ** Manage Module Paths **
        <Route path={`manage`} element={<Manage />} />
        <Route path={`manage/report_cart_pdf`} element={<PDFCartReport />} />
        <Route
          path={`manage/rounding_view`}
          element={<ManagerRoundingView />}
        />
        <Route path={`manage/view_users`} element={<Users />} />
        <Route path={`manage/view_users/user`} element={<ViewUserPage />} />
        <Route
          path={`manage/view_users/create_user`}
          element={<CreateUser />}
        />
      </Route>
    </Routes>
  );
}

export default App;
