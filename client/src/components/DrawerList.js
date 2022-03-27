import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { DashboardOutlined, AddCircleOutline } from "@mui/icons-material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
  iconStyle: {
    margin: theme.spacing(0, 0),
    color: "#676767",
  },
  iconTitle: {
    margin: theme.spacing(0, 0, 0, 1),
    color: "#676767",
  },
  listItem: {
    "&.Mui-selected": {
      // it is used to change external svg color during click
      "& path": {
        fill: "#fff",
      },
      margin: theme.spacing(1.5, 1),
    },
  },
}));

const DrawerList = ({ userData }) => {
  //console.log(children);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const classes = useStyles();

  const itemList = [
    {
      text: " Dashboard",
      icon: <DashboardOutlined />,
      keys: "dashboard",
      to: "",
      hasModule: true,
    },
    {
      text: " Rounding",
      icon: <AddCircleOutline />,
      keys: "rounding",
      to: "rounding",
      hasModule: userData.hasRoundingModule,
    },
    {
      text: " Manage",
      icon: <SupervisorAccountIcon />,
      keys: "manage",
      to: "manage",
      hasModule: userData.hasManagerModule,
    },
  ];

  const ListData = () =>
    itemList.map((item, index) => {
      if (item.hasModule) {
        console.log(item.text);
        console.log(item.hasModule);
        const { text, icon, to, keys } = item;

        return (
          <ListItem
            className={classes.listItem}
            button
            key={keys}
            to={to}
            component={Link}
            selected={index === selectedIndex}
            onClick={(e) => handleListItemClick(e, index)}
            style={
              selectedIndex === index
                ? {
                    background: "#3f51b5",
                    width: 200,
                    marginLeft: 8,
                    paddingLeft: 10,
                    borderRadius: 4,
                    boxShadow: "2px 3px 6px rgba(0, 0, 0, 0.3)",
                  }
                : {}
            }
          >
            <ListItemIcon
              className={classes.iconStyle}
              style={selectedIndex === index ? { color: "#fff" } : {}}
            >
              {icon}
              <ListItemText>
                <Typography
                  component="div"
                  className={classes.iconTitle}
                  style={selectedIndex === index ? { color: "#fff" } : {}}
                >
                  <Box fontWeight={700} fontSize={13.8}>
                    {text}
                  </Box>
                </Typography>
              </ListItemText>
            </ListItemIcon>
          </ListItem>
        );
      }
    });

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <ListData />
    </div>
  );
};

export default DrawerList;
