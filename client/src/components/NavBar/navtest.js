import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#042913"
    },
    primary: {
      main: "#b08968",
    },
    secondary: {
      main: "#94b395",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "17px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "purple",
      borderBottom: "1px solid purple",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
      <div>Home</div>
   
  );
}
export default Navbar;