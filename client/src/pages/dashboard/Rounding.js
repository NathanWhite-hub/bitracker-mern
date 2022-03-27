import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PageviewIcon from "@mui/icons-material/Pageview";
import AddIcon from "@mui/icons-material/Add";
import { darken, lighten } from "@mui/material/styles";

import { userCartsRounded, viewRoundedCart } from "../../api/wowTeamRoutes";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

function Rounding() {
  const [cartsRounded, setCartsRounded] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    userCartsRounded()
      .then((response) => {
        setCartsRounded(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleViewCart = (cartSerialNumber) => {
    console.log("Searching for: " + cartSerialNumber);
    viewRoundedCart(cartSerialNumber).then((response) => {
      navigate("cart_view", { state: { cart: response.data }, replace: true });
    });
  };

  const viewCartButton = (params) => {
    return (
      <PageviewIcon
        variant="contained"
        color="primary"
        fontSize="large"
        onClick={() => {
          handleViewCart(params.row.cartSerialNumber);
        }}
      />
    );
  };

  const columns = [
    {
      field: "Action",
      headerName: "",
      width: 85,
      renderCell: viewCartButton,
    },
    {
      field: "serialNum",
      headerName: "Cart Serial Number",
      width: 250,
    },
    {
      field: "pcNum",
      headerName: "Workstation Number",
      width: 250,
    },
    {
      field: "dateLastRounded",
      headerName: "Last Rounded On",
      width: 250,
    },
    {
      field: "repairsNeeded",
      headerName: "Repairs?",
      width: 100,
    },
    {
      field: "quarter",
      headerName: "Quarter",
      width: 75,
    },
  ];

  const [sortModel] = React.useState([
    {
      field: "dateLastRounded",
      sort: "desc",
    },
  ]);

  const isRepairNeeded = (row) => {
    if (row.isPowerCordDamaged) return "Yes";
    else if (row.isFuseBlown) return "Yes";
    else if (row.isInverterBad) return "Yes";
    else if (row.isInterfaceDamaged) return "Yes";
    else if (row.isPhysicalDamage) return "Yes";
    return "No";
  };

  const rows = useMemo(
    () =>
      cartsRounded.map((row, index) => ({
        ...row,
        id: index,
        serialNum: row.cartSerialNumber,
        pcNum: row.pcNumber,
        dateLastRounded: moment(row.updatedAt).format("MM-D-YYYY h:mm A"),
        repairsNeeded: isRepairNeeded(row),
        quarter: moment(row.updatedAt).format("Qo"),
      })),
    [cartsRounded]
  );

  return (
    <Box
      sx={{
        height: 400,
        width: 1,
        "& .super-app-theme--No": {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.success.main, theme.palette.mode),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode
              ),
          },
        },
        "& .super-app-theme--Yes": {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.error.main, theme.palette.mode),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.error.main,
                theme.palette.mode
              ),
          },
        },
      }}
    >
      <Stack direction="row" spacing={2} p={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("add_new_cart");
          }}
        >
          Add Cart
        </Button>
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          component={Paper}
          rows={rows}
          columns={columns}
          sortModel={sortModel}
          getRowClassName={(params) =>
            `super-app-theme--${params.getValue(params.id, "repairsNeeded")}`
          }
          pageSize={100}
          rowsPerPageOptions={[100]}
        />
      </div>
    </Box>
  );
}

export default Rounding;
