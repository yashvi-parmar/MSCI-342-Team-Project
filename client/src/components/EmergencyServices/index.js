import React, { Component } from 'react';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import BarkButton from '../BarkButton';
const opacityValue = 10;

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
      marginTop: "10vh",
      marginLeft: theme.spacing(10),
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

function EmergencyServices() {
    return (
        <Grid style={{backgroundColor: '#6F4E37', height: '100vh'}}> 
          <Navbar></Navbar>
          <BarkButton></BarkButton>

          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{backgroundColor: '#6F4E37', padding: '4vh'}}
          >
            <h1 style={{color: 'white'}}>Emergency Serivices</h1>
            
            <h3 style={{color: 'white'}}>In the event of an emergency: 9-1-1</h3>
            <h3 style={{color: 'white'}}>Canadian Coast Guard: 1-800-265-0237</h3>

            <h3 style={{color: 'white'}}>Domestic Abuse Hotline: </h3>
            <h3 style={{color: 'white'}}>Idk some other number: </h3>
            <h3 style={{color: 'white'}}>Kids Help Line: 1-800-668-6868</h3>


          </Grid>
        </Grid>     
      )
}

export default EmergencyServices;
