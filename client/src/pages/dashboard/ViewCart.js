import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Material UI Imports
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import NoteIcon from "@mui/icons-material/Note";
import ComputerIcon from "@mui/icons-material/Computer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

import { updateCart } from "../../api/wowTeamRoutes";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formGrid: {
    margin: "auto",
  },
  form: {
    width: "45%",
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

function ViewCart() {
  let navigate = useNavigate();
  let location = useLocation();

  const [data, setData] = useState({
    id: location.state.cart._id,
    cartSerialNumber: location.state.cart.cartSerialNumber,
    pcNumber: location.state.cart.pcNumber,
    hospitalRoundedAt: location.state.cart.hospitalRoundedAt,
    isPowerCordDamaged: location.state.cart.isPowerCordDamaged,
    isFuseBlown: location.state.cart.isFuseBlown,
    isInverterBad: location.state.cart.isInverterBad,
    isInterfaceDamaged: location.state.cart.isInterfaceDamaged,
    isPhysicalDamage: location.state.cart.isPhysicalDamage,
    otherNotes: location.state.cart.otherNotes,
  });

  const classes = useStyles();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    updateCart(data)
      .then((response) => {
        toast.success(response.data.message);
        navigate("../rounding");
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

  const handleCheckChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleTextChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <form className={classes.form}>
        <InputTextFields
          variant="outlined"
          margin="normal"
          type="text"
          required
          fullWidth
          id="cartSerialNumber"
          value={data.cartSerialNumber}
          label="Cart Serial Number"
          name="cartSerialNumber"
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
          fullWidth
          id="pcNumber"
          value={data.pcNumber}
          label="PC Number"
          name="pcNumber"
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
          Other Information
        </Typography>
        <Box sx={{ display: "inline" }}>
          <FormControl sx={{ m: 1.5 }} component="fieldset" variant="standard">
            <FormLabel component="TypeOfRepair">
              Type of Repair Needed
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                label="Power Cord Damaged"
                control={
                  <Checkbox
                    name="isPowerCordDamaged"
                    value={data.isPowerCordDamaged}
                    checked={data.isPowerCordDamaged}
                    onChange={handleCheckChange}
                  />
                }
              />
              <FormControlLabel
                label="Fuse Blown"
                control={
                  <Checkbox
                    name="isFuseBlown"
                    value={data.isFuseBlown}
                    checked={data.isFuseBlown}
                    onChange={handleCheckChange}
                  />
                }
              />
              <FormControlLabel
                label="Bad Inverter"
                control={
                  <Checkbox
                    name="isInverterBad"
                    value={data.isInverterBad}
                    checked={data.isInverterBad}
                    onChange={handleCheckChange}
                  />
                }
              />
              <FormControlLabel
                label="Interface Membrane Damaged"
                control={
                  <Checkbox
                    name="isInterfaceDamaged"
                    value={data.isInterfaceDamaged}
                    checked={data.isInterfaceDamaged}
                    onChange={handleCheckChange}
                  />
                }
              />
              <FormControlLabel
                label="Physical Damage to Cart"
                control={
                  <Checkbox
                    name="isPhysicalDamage"
                    value={data.isPhysicalDamage}
                    checked={data.isPhysicalDamage}
                    onChange={handleCheckChange}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex" }}>
          <FormLabel
            sx={{ padding: "5px", position: "relative", alignSelf: "center" }}
          >
            Hospital
          </FormLabel>
          <Select
            id="hospitalRoundedAt"
            name="hospitalRoundedAt"
            required
            value={data.hospitalRoundedAt}
            onChange={handleTextChange}
            label="Hospital"
            fullWidth
            sx={{ marginTop: 1 }}
          >
            <MenuItem value="Maple Valley">Maple Valley</MenuItem>
            <MenuItem value="Springhill">Springhill</MenuItem>
            <MenuItem value="Evergreen">Evergreen</MenuItem>
            <MenuItem value="Greenwood Hospital">Greenwood Hospital</MenuItem>
            <MenuItem value="Main Campus">Pioneer Medical Center</MenuItem>
            <MenuItem value="Lakeside">Lakeside</MenuItem>
            <MenuItem value="Lowland Medical Center">
              Lowland Medical Center
            </MenuItem>
            <MenuItem value="Hope Valley Clinic">Hope Valley Clinic</MenuItem>
            <MenuItem value="Westview">Westview</MenuItem>
          </Select>
        </Box>
        <InputTextFields
          variant="filled"
          margin="normal"
          type="text"
          fullWidth
          id="otherNotes"
          value={data.otherNotes}
          label="Other Notes"
          name="otherNotes"
          onChange={handleTextChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <NoteIcon color="grey" />
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
    </Grid>
  );
}

export default ViewCart;
