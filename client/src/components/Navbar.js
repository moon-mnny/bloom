import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawermeu from "./Drawermenu";
import pinkimg from "../img/bloom_pink.gif";
import orangeimg from "../img/bloom_orange.gif";
import blueimg from "../img/blue.gif";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
    textAlign: "center",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  var logo = "";
  if (props.currentMood === "Happy") {
    logo = pinkimg;
  } else if (props.currentMood === "Bleh") {
    logo = orangeimg;
  } else {
    logo = blueimg;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: "white" }}>
        <Toolbar
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "4px",
          }}
        >
          <Drawermeu
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          />

          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <div>
            <img src={logo} alt="BLOOM" style={{ height: "4vh" }} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
