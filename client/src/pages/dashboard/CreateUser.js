import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

// Material UI Imports
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@material-ui/core/InputAdornment";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import ComputerIcon from "@mui/icons-material/Computer";
import { styled } from "@mui/material/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

import { createUser } from "../../api/managerRoutes";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "left",
  },
  formGrid: {
    margin: "auto",
  },
  form: {
    width: "35%",
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

function CreateUser() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    team: "",
    hasRoundingModule: false,
    hasManagerModule: false,
  });
  const classes = useStyles();

  const handleTextChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));

    if (e.target.name === "hasManagerModule" && e.target.checked)
      toast.warning(
        "Giving a user access to the Manager module allows the user full access to the application!",
        {
          autoClose: 7000,
        }
      );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    createUser(data)
      .then((response) => {
        toast.success(response.data.message);
        navigate("../manage/view_users");
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

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <form className={classes.form}>
        <Typography variant="h6" noWrap>
          User Information
        </Typography>
        <InputTextFields
          variant="outlined"
          margin="normal"
          type="text"
          required
          fullWidth
          id="firstName"
          value={data.firstName}
          label="First Name"
          name="firstName"
          onChange={handleTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LineStyleIcon color="grey" />
              </InputAdornment>
            ),
          }}
        />
        <InputTextFields
          variant="outlined"
          margin="normal"
          type="text"
          required
          fullWidth
          id="lastName"
          value={data.lastName}
          label="Last Name"
          name="lastName"
          onChange={handleTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ComputerIcon color="grey" />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="h6" noWrap>
          User Settings
        </Typography>
        <InputTextFields
          variant="outlined"
          margin="normal"
          type="text"
          required
          fullWidth
          id="userName"
          value={data.userName}
          label="User name"
          name="userName"
          onChange={handleTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ComputerIcon color="grey" />
              </InputAdornment>
            ),
          }}
        />
        <InputTextFields
          variant="outlined"
          margin="normal"
          type="text"
          fullWidth
          required
          id="password"
          value={data.password}
          label="Password"
          name="password"
          onChange={handleTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ComputerIcon color="grey" />
              </InputAdornment>
            ),
          }}
        />
        <Select
          id="team"
          name="team"
          required
          value={data.team}
          onChange={handleTextChange}
          label="Team"
          sx={{ marginTop: 1 }}
        >
          <MenuItem value="WOW Cart">WOW Team</MenuItem>
          <MenuItem value="Warehouse">Warehouse</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
        </Select>
        <Grid xs={8}>
          <FormControl sx={{ m: 1.5 }} component="fieldset" variant="standard">
            <FormLabel>Module Access</FormLabel>
            <FormGroup>
              <FormControlLabel
                label="Rounding Module"
                control={
                  <Checkbox
                    name="hasRoundingModule"
                    value={data.hasRoundingModule}
                    onChange={handleCheckChange}
                  />
                }
              />
              <FormControlLabel
                label="Manager Module"
                control={
                  <Checkbox
                    name="hasManagerModule"
                    value={data.hasManagerModule}
                    onChange={handleCheckChange}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleOnSubmit}
          //disabled={loading}
        >
          Submit Edit
        </Button>
      </form>
    </Grid>
  );
}

export default CreateUser;
