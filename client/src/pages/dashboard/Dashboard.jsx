import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { validate } from "../../api/authRoutes";
import { getUserName } from "../../api/dashboardRoutes";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

import NavBar from "../../components/NavBar";

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  let navigate = useNavigate();

  // PROTECTED ROUTE. CALLS VALIDATE FUNC WHICH SENDS A REQUEST TO THE SERVER TO VERIFY SESSION/COOKIE.
  useEffect(() => {
    validate()
      .then((res) => {
        if (!res.data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    getUserName()
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#283593",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar userData={userData}>
        <ToastContainer />
        <Outlet />
      </NavBar>
    </ThemeProvider>
  );
}
