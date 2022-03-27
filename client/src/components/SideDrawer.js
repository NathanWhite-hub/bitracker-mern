import { Divider, Drawer, List } from "@mui/material";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import DrawerList from "./DrawerList";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const SideDrawer = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const { open, userData } = props;
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <h1>NTG</h1>
      </div>
      <Divider />
      <List>
        {/* my component to render list of icons in side drawer */}
        <DrawerList userData={userData} />
      </List>
    </Drawer>
  );
};

export default SideDrawer;
