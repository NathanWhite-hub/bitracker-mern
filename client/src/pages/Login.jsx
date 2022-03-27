// Dependencies
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Material UI Imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { styled } from "@mui/material/styles";

import { login, validate } from "../api/authRoutes";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    minHeight: "100vh",
    justifyContent: "center",
    backgroundImage: "url(../assets/loginBackground.jpg)",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formGrid: {
    margin: "auto",
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  paper: {
    margin: theme.spacing(4, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InputTextFields = styled(TextField)({
  "& fieldset": {
    borderWidth: 2.5,
  },
});

const Login = (props) => {
  const [data, setData] = useState({ username: "", password: "" });
  const classes = useStyles();
  let navigate = useNavigate();

  useEffect(() => {
    validate()
      .then((res) => {
        if (res.data.success) {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else if (err.request) {
          toast.error(err.request);
        } else {
          toast.error(err.message);
        }
      });
  }, [navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    login(data)
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else if (err.request) {
          toast.error(err.request);
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <ToastContainer />
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={3}
        md={4}
        component={Paper}
        elevation={6}
        className={classes.formGrid}
      >
        <div className={classes.paper}>
          <img
            src="../assets/bitrackerLogo.png"
            width="45%"
            height="45%"
            alt="ntgLogo.png"
          />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form className={classes.form}>
            <InputTextFields
              variant="outlined"
              margin="normal"
              type="text"
              required
              fullWidth
              id="username"
              value={data.username}
              label="UserName"
              name="username"
              autoComplete="username"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon color="grey" />
                  </InputAdornment>
                ),
              }}
            />
            <InputTextFields
              variant="outlined"
              margin="normal"
              type="password"
              required
              fullWidth
              value={data.password}
              label="Password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon color="grey" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleOnSubmit}
              //disabled={loading}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
  // };
};

export default Login;
