import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import ManagerGraphCardsDamagedCarts from "../../components/manageModule/ManagerGraphCardsDamagedCarts";
import { cartsRoundedForMonth } from "../../api/managerRoutes";

import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { makeStyles } from "@material-ui/core/styles";

const today = new Date(),
  currentYear = moment(today).format("YYYY"),
  currentMonth = moment(today).format("MM"),
  quarterIn = moment(today).format("Q");

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
  },
  gridContainer: {
    padding: "15px",
    paddingBottom: "35px",
  },
  paper: {
    margin: theme.spacing(4, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  userButton: {
    justifyContent: "center",
    margin: "center",
    paddingBottom: "15px",
  },
  statCard: {
    justifyContent: "center",
  },
}));

function Manage() {
  const [cartsTotalRoundedByMonth, setCartsTotalRoundedByMonth] = useState([]);
  const cartsRoundedNotDamagedByMonth = [];
  const cartsPowerCordDamaged = [];
  const cartsFuseBlown = [];
  const cartsInverterBad = [];
  const cartsInterfaceDamaged = [];
  const cartsPhysicalDamage = [];

  const classes = useStyles();

  let navigate = useNavigate();

  useEffect(() => {
    cartsRoundedForMonth(currentYear, currentMonth)
      .then((response) => {
        setCartsTotalRoundedByMonth(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isCartDamagedMonthly = (cart) => {
    if (cart.isPowerCordDamaged) cartsPowerCordDamaged.push(cart);
    else if (cart.isFuseBlown) cartsFuseBlown.push(cart);
    else if (cart.isInverterBad) cartsInverterBad.push(cart);
    else if (cart.isInterfaceDamaged) cartsInterfaceDamaged.push(cart);
    else if (cart.isPhysicalDamage) cartsPhysicalDamage.push(cart);
    else cartsRoundedNotDamagedByMonth.push(cart);
  };

  const monthCartMap = useMemo(
    () =>
      cartsTotalRoundedByMonth.map((cart, index) => ({
        ...cart,
        isCartDamaged: isCartDamagedMonthly(cart),
      })),
    [cartsTotalRoundedByMonth]
  );

  const dataCartsDamagedAndNot = [
    { name: "Not Damaged", value: cartsRoundedNotDamagedByMonth.length },
    {
      name: "Damaged",
      value:
        cartsPowerCordDamaged.length +
        cartsFuseBlown.length +
        cartsInverterBad.length +
        cartsInterfaceDamaged.length +
        cartsPhysicalDamage.length,
    },
  ];

  const cartDataByTypeOfDamage = [
    {
      powerCordDamaged: cartsPowerCordDamaged.length,
      fuseBlown: cartsFuseBlown.length,
      inverterBad: cartsInverterBad.length,
      interfaceMembraneDamaged: cartsInterfaceDamaged.length,
      physicalDamage: cartsPhysicalDamage.length,
    },
  ];

  return (
    <Box textAlign="center">
      <Grid
        container
        spacing={2}
        className={classes.gridContainer}
        justifyContent="center"
        padding="15"
      >
        <Stack direction="row" spacing={2} p={2}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.userButton}
            onClick={() => {
              navigate("view_users");
            }}
          >
            Users
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.userButton}
            onClick={() => {
              navigate("rounding_view", {
                state: {
                  quarterIn: quarterIn,
                  currentYear: currentYear,
                },
                replace: true,
              });
            }}
          >
            Rounding View
          </Button>
        </Stack>
      </Grid>
      <Paper square={false}>
        <Grid
          container
          spacing={4}
          className={classes.gridContainer}
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <ManagerGraphCardsDamagedCarts
              className={classes.statCard}
              data={dataCartsDamagedAndNot}
              currentDate={today}
              cartByTypeOfDamage={cartDataByTypeOfDamage}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Manage;
