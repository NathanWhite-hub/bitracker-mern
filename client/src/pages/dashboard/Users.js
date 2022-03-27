import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getAllUsers, viewUser } from "../../api/managerRoutes";

import Button from "@mui/material/Button";
import PageviewIcon from "@mui/icons-material/Pageview";
import AddIcon from "@mui/icons-material/Add";

import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Users() {
  const [users, setUsers] = useState([]);
  const [sortModel] = useState([
    {
      field: "name",
      sort: "asc",
    },
  ]);

  let navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleViewUser = (userID) => {
    viewUser(userID).then((response) => {
      navigate("user", { state: { user: response.data }, replace: true });
    });
  };

  const viewUserButton = (params) => {
    return (
      <PageviewIcon
        variant="contained"
        color="primary"
        fontSize="large"
        onClick={() => {
          handleViewUser(params.row._id);
        }}
      />
    );
  };

  const columns = [
    {
      field: "view",
      headerName: "View",
      width: 85,
      renderCell: viewUserButton,
    },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "team",
      headerName: "Team",
      width: 250,
    },
  ];

  const rows = useMemo(
    () =>
      users.map((row, index) => ({
        ...row,
        id: index,
        name: row.firstName + " " + row.lastName,
        team: row.team,
      })),
    [users]
  );

  return (
    <Box
      sx={{
        height: 400,
        width: 1,
      }}
    >
      <Stack direction="row" spacing={2} p={2}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("create_user");
          }}
          startIcon={<AddIcon />}
        >
          Create User
        </Button>
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          autoHeight
          component={Paper}
          rows={rows}
          columns={columns}
          sortModel={sortModel}
          pageSize={100}
          rowsPerPageOptions={[100]}
        />
      </div>
    </Box>
  );
}

export default Users;
