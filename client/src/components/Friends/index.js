import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import {Avatar, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SignIn from '../SignIn'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';


const opacityValue = 1;

const cardStyle={padding :30, height:'60vh',width:380, marginTop: "30px", margin:"20px auto"}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";

function Friends() {
    return (
      
        <div> 
          <NavbarTop></NavbarTop>
      
          

          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{backgroundColor: '#6F4E37', padding: '4vh', color: 'white'}}
          >
            <h3>Your Friends</h3>


          </Grid>
          <Navbar></Navbar>
        </div>     
      )
}

export default Friends;