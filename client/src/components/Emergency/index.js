import React, { Component, useEffect, useState} from 'react';
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
import SignIn from '../SignIn'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
import DogBarking from "./assets/DogBarking.wav";


const cardStyle={padding :30, height:'60vh',width:380, marginTop: "30px", margin:"20px auto"}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}



function Emergency() {



  const playSound =()=> {
    new Audio(DogBarking).play();
  };

  return (
    <grid>
    <Navbar></Navbar>
    <div className="Emergency">
       <Grid>
            <Paper elevation={10} style={cardStyle}>
                <Grid align='center'>
                
                    <h2>Emergency Dashboard</h2>
                <Link href="/EmergencyContacts">   
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth>Emergency Contacts</Button>
                </Link>
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth>Fake Phone Call Generator</Button>
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth onClick={playSound}>Bark </Button>
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth>911</Button>
             
                
                </Grid>
              
            </Paper>
        </Grid>
    </div>
    </grid>
  );
}



export default Emergency;