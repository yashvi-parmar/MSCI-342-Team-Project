import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Avatar, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
import { useTheme } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import BarkLogo from './BarkLogo.jpg';




//Dev mode
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046"; //enable for dev mode
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");
const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}
const opacityValue = 0.95;

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

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "5vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;



    const mainMessage = (
      <Grid>
          <Navbar></Navbar>

      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >

        <div style={{ margin: '100px' }}>
          <img src={BarkLogo} alt="Bark Logo" style={{ width: '400px', }}/>
        </div>

        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Welcome!
              </React.Fragment>
            ) : (
              <React.Fragment>
                Bye!
              </React.Fragment>
            )}
          </Typography>
        </Grid>
      </Grid>
      </Grid>
    )

    return (
     
      <MuiThemeProvider theme={theme}>
        <Box
       sx={{
         height: '100vh',
         opacity: opacityValue,
         overflow: "hidden",
         backgroundColor: theme.palette.background.default,
 
       }}
     >
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
          </Paper>

        </div>
        </Box>
      </MuiThemeProvider>
      
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);