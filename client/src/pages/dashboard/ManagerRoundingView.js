import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import moment from "moment";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbar,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import PageviewIcon from "@mui/icons-material/Pageview";
import { darken, lighten } from "@mui/material/styles";

import { roundingViewByQuarter } from "../../api/managerRoutes";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

function DataGridToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport
        csvOptions={{ allColumns: true }}
        printOptions={{ disableToolbarButton: true }}
      />
    </GridToolbarContainer>
  );
}

function ManagerRoundingView() {
  const [cartsRoundedQuarter, setCartsRoundedQuarter] = useState([]);
  var currentQuarter = [];

  let navigate = useNavigate();
  let location = useLocation();

  const quarterIn = location.state.quarterIn;

  if (quarterIn === "1") {
    currentQuarter = {
      startDate: `${location.state.currentYear}-01-1`,
      endDate: `${location.state.currentYear}-03-31`,
    };
  } else if (quarterIn === "2") {
    currentQuarter = {
      startDate: `${location.state.currentYear}-04-1`,
      endDate: `${location.state.currentYear}-06-30`,
    };
  } else if (quarterIn === "3") {
    currentQuarter = {
      startDate: `${location.state.currentYear}-07-1`,
      endDate: `${location.state.currentYear}-09-30`,
    };
  } else if (quarterIn === "4") {
    currentQuarter = {
      startDate: `${location.state.currentYear}-10-1`,
      endDate: `${location.state.currentYear}-12-31`,
    };
  }

  useEffect(() => {
    roundingViewByQuarter(currentQuarter)
      .then((response) => {
        setCartsRoundedQuarter(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const viewCartButton = (params) => {
    return (
      <PageviewIcon variant="contained" color="primary" fontSize="large" />
    );
  };

  const columns = [
    {
      field: "View",
      headerName: "View",
      width: 85,
      disableExport: true,
      //renderCell: viewCartButton,
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 85,
      disableExport: true,
      //renderCell: viewCartButton,
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
      field: "hospitalAt",
      headerName: "Hospital",
      width: 250,
    },
    {
      field: "roundedBy",
      headerName: "Technician",
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
      disableExport: true,
    },
  ];

  const [sortModel] = useState([
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
      cartsRoundedQuarter.map((row, index) => ({
        ...row,
        id: index,
        serialNum: row.cartSerialNumber,
        pcNum: row.pcNumber,
        hospitalAt: row.hospitalRoundedAt,
        roundedBy: row.roundedByName,
        dateLastRounded: moment(row.updatedAt).format("MM-D-YYYY h:mm A"),
        repairsNeeded: isRepairNeeded(row),
      })),
    [cartsRoundedQuarter]
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          components={{ Toolbar: DataGridToolbar }}
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

export default ManagerRoundingView;
