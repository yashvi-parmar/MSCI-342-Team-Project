import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import {Avatar, TextField, Button, Link, CardContent } from '@material-ui/core'
import Navbar from '../NavBar';
import BarkButton from '../BarkButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';

const cardStyle={padding :30, height:'60vh',width:380, marginTop: "30px", margin:"20px auto"}
const buttonStyle={margin:'8px 0', backgroundColor: '#042913', color: 'white'}
const textStyle={marginBottom: '8px'}
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";

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

function Avatars() {
    return (
      <div>
        <Avatar style={{backgroundColor: '#EBD6C1', color: '#B08968', width: '35vh', height: '35vh', fontSize: '20vh', left: '20vh', top: '10vh', display: 'flex', justifyContent: 'center'}}>VP</Avatar>
      </div>
    );
}

function ProfileCont() {
  return(
    <Grid style={{color: 'white', marginLeft: '0vh', marginTop: '15vh'}}>
      <h3>Name: Vedangi Patel</h3> 
      <h3>Username: _ve_</h3> 
      <h3>Email: vedangipatel@gmail.com</h3> 
      <h3>Phone Number: 0123456789</h3> 
      <h3>Current Location: insert current location</h3> 
    </Grid>
  )
}


function Profile() {
    return (
        <Grid style={{backgroundColor: '#6F4E37', height: '100vh'}}> 
          <Navbar></Navbar>
          <BarkButton></BarkButton>


          <Grid style={{paddingTop: '1vh', display: 'flex'}}>
          <Grid container={1} display='flex'>
            <Avatars></Avatars>
          </Grid>
          <Grid container={1} display='flex' style={{marginLeft: '0vh'}}>
            <ProfileCont></ProfileCont>
          </Grid>
          </Grid>
        </Grid>     
      )
}

export default Profile;
