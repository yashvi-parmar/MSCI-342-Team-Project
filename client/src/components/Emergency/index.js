import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Avatar, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CreateAccount from '../CreateAccount'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
const cardStyle={padding :30, height:'40vh',width:280, marginTop: "5vh", margin:"90px auto", backgroundColor: '#6F4E37'}

const buttonStyle={margin:'8px 0', backgroundColor: '#2E5129', color: 'white'}
const textStyle={marginBottom: '8px', color: 'white',  width: 240}
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";

function Emergency() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submissionCheck, setSubmissionCheck]=React.useState(false)
  const [submissionValidation,setSubmissionValidation] = React.useState(false);

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handlePasswordInput = (event) => {
    handlePassword(event.target.value)
 }
 
  const handleUsername = (username) => {
   setUsername(username);
 };

 const handleUsernameInput = (event) => {
    handleUsername(event.target.value)
 }
  
  
  
 const handleSubmissionCheck = (event) =>{
    setSubmissionCheck(true);
  }
  const handleSubmissionValidation = (event) => {
    event.preventDefault();
    if(password !== '' && username !==''){
      setUsername('');
      setPassword('');
      setSubmissionValidation(true);
      setSubmissionCheck(false);
    }
  };


  return (
    <grid>
    
    <div className="SignIn">
  
      <Grid align="center">
            <Paper elevation={10} style={cardStyle}>
                <Grid align='center'>
                    <h2 style= {{color: '#E6CCB2'}}>Sign In</h2>
                </Grid>
                <FormControl style={{marginTop: '2vh'}}>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
                <TextField style={textStyle} label='Username' placeholder='Enter username' variant="outlined" value={username} onChange = {handleUsernameInput} />
                  {
                    username === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
  
                <TextField style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" value = {password} onChange={handlePasswordInput} fullWidth />
                {
                    password === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your password!</em></div>) : (<div></div>)
                  }

                
                
                <div style={{marginTop: '8vh'}}> 
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth  onClick={handleSubmissionCheck} >Sign in</Button>
                     <Link href="/CreateAccount" style={{color: 'black'}}>
                        Create an Account 
                </Link>
                
                </div>
                
                
                </form>
             </FormControl> 
             
               
            </Paper>
        </Grid>
       
    </div>
    </grid>
  );
}

export default Emergency;






