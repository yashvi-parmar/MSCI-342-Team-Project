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
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>

      <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
        </IconButton>

        <Typography variant="h3" className={classes.logo}>
          Bark
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/Map" className={classes.link}>
              Map
            </Link>
            <Link to="/Dashboard" className={classes.link}>
              Dashboard
            </Link>

            <Link to="/Emergency" className={classes.link}>
              Emergency
            </Link>
            <Link to="/SignIn" className={classes.link}>
              Sign In
            </Link>
            <Link to="/CreateAccount" className={classes.link}>
              CreateAccount
            </Link>
            <Link to="/Share" className={classes.link}>
              Share
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

