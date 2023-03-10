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
import CreateAccount from '../CreateAccount'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
const cardStyle={padding :30, height:'60vh',width:280, marginTop: "30px", margin:"20px auto"}

const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}


function SignIn() {
  return (
    <grid>
    <Navbar></Navbar>
    <div className="SignIn">
  
      <Grid>
            <Paper elevation={10} style={cardStyle}>
                <Grid align='center'>
                    <div data-testid="foo">Sign In</div>
                </Grid>
                <TextField 
                style={textStyle} 
                label='Username' 
                placeholder='Enter username' 
                variant="outlined"  />
  
                <TextField style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth required>Sign in</Button>
             
                
                     <Link href="/CreateAccount" style={{color: 'black'}}>
                        Create an Account 
                </Link>
               
            </Paper>
        </Grid>
       
    </div>
    </grid>
  );
}

export default SignIn;
