/** @format */

import {
  Button,
  Fab,
  ListItem,
  ListItemIcon,
  Tooltip,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, ExitToApp, ViewAgenda } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { HashRouter, NavLink, Route, Switch } from "react-router-dom";
import LocalStorage from "../Common/LocalStorage";
import AddEmployee from "./AddEmployee";
import ViewEmployee from "./ViewEmployee";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "#0f2862",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#0f2862",
    backgroundImage: "linear-gradient(147deg, #000000 0%, #04619f 74%)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    outline: "none",
    color: theme.palette.common.white,
    backgroundColor: "#0f2862",
    "&:hover": {
      backgroundColor: " #0f2861",
    },
  },
}));

function Dashboard(props) {
  const { windows } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleLogOut = () => {
    LocalStorage.removeUser();
    window.location.reload();
  };

  const drawer = (
    <div>
      <center>
        <br />
        <Typography
          style={{
            color: "white",
          }}
          component="h2"
        >
          EvDigiTech
        </Typography>

        <Divider />
        <List>
          <NavLink to="/add-employee">
            <ListItem>
              <Button
                className="btn"
                size="medium"
                variant="contained"
                style={{
                  backgroundColor: "#0f2862",
                  color: "white",
                  outline: "none",
                }}
                disableElevation
              >
                <ListItemIcon>
                  <AccountCircle
                    style={{
                      backgroundColor: "#0f2862",
                      color: "white",
                      outline: "none",
                    }}
                  />
                </ListItemIcon>
                Add Employee
              </Button>
            </ListItem>
          </NavLink>
          <NavLink to="/view-employee">
            <ListItem>
              <Button
                className="btn"
                variant="contained"
                style={{
                  backgroundColor: "#0f2862",
                  color: "white",
                  outline: "none",
                }}
                disableElevation
              >
                <ListItemIcon>
                  <ViewAgenda
                    style={{
                      backgroundColor: "#0f2862",
                      color: "white",
                      outline: "none",
                    }}
                  />
                </ListItemIcon>
                View Employee
              </Button>
            </ListItem>
          </NavLink>
        </List>
      </center>
    </div>
  );
  const container =
    windows !== undefined ? () => window().document.body : undefined;
  return (
    <HashRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ flexGrow: "1" }}>
              EvDigiTech
            </Typography>
            <Typography variant="subtitle1">
              hi! {LocalStorage.getUser()[0].name} &nbsp;
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/add-employee" exact component={AddEmployee} />
            <Route path="/view-employee" exact component={ViewEmployee} />
          </Switch>
        </main>
        <Tooltip
          title="Log-out"
          placement="bottom-start"
          arrow
          className={classes.fab}
        >
          <Fab edge="end" onClick={handleLogOut}>
            <ExitToApp />
          </Fab>
        </Tooltip>
      </div>
    </HashRouter>
  );
}

export default Dashboard;
