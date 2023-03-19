
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
import SignIn from '../SignIn'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import { FormControl, FormLabel, RadioGroup,} from '@material-ui/core';
import Navbar from '../NavBar';
const cardStyle={padding :30, height:'60vh',width:280, marginTop: "30px", margin:"20px auto"}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}
const serverURL = ""
//"http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";
function CreateAccount() {

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordReenter, setPasswordReenter]=React.useState('');
  const [submissionCheck, setSubmissionCheck]=React.useState(false)
  const [submissionValidation,setSubmissionValidation] = React.useState(false);

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handlePasswordInput = (event) => {
    handlePassword(event.target.value)
 }

 const handlePasswordReenter = (passwordReenter) => {
  setPasswordReenter(passwordReenter);
};

const handlePasswordReenterInput = (event) => {
  handlePasswordReenter(event.target.value)
}
 
  const handleUsername = (username) => {
   setUsername(username);
 };

 const handleUsernameInput = (event) => {
    handleUsername(event.target.value)
 }

 const handleEmail = (email) => {
  setEmail(email);
 }

 const handleEmailInput = (event) => {
  handleEmail(event.target.value);
 }

 const handleSubmissionCheck = (event) =>{
  setSubmissionCheck(true);
}
const handleSubmissionValidation = (event) => {
  event.preventDefault();
  if(password !== '' && username !=='' && email !== '' && passwordReenter !== '' && (password===passwordReenter)){
    setUsername('');
    setPassword('');
    setEmail('');
    setPasswordReenter('');
    setSubmissionValidation(true);
    setSubmissionCheck(false);
  }
};

  return (
    <grid>
      <Navbar></Navbar>
    <div className="CreateAccount">
       <Grid>
            <Paper elevation={10} style={cardStyle}>
                <Grid align='center'>
                
                    <h2>Create an Account</h2>
                </Grid>
                <FormControl>
                <form autoComplete='off' onSubmit={handleSubmissionValidation}>
                <TextField style={textStyle} label='Username' placeholder='Enter username' variant="outlined" fullWidth value={username} onChange={handleUsernameInput} />
                  {
                    username === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
                <TextField style={textStyle} label='Email' placeholder='Enter email' variant="outlined" fullWidth value={email} onChange={handleEmailInput} />
                  {
                    email === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your email!</em></div>) : (<div></div>)
                  }
                
                <TextField style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth value={password} onChange={handlePasswordInput} />
                  {
                    password === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your password!</em></div>) : (<div></div>)
                  }
                <TextField style={textStyle} label='Re-enter Password' placeholder='Re-enter password' type='password' variant="outlined" fullWidth value={passwordReenter} onChange={handlePasswordReenterInput} />
                  {
                    passwordReenter=== '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please re-enter your password!</em></div>) : (<div></div>)
                  }
                  {
                    passwordReenter !== '' && password !=='' && submissionCheck ===true && (password !==passwordReenter) ? (
                    <div><em style={{color:'red'}}>*Passwords do not match! Please type your password again!</em></div>) : (<div></div>)
                  }
                
                <Button type='submit' variant="contained" style={buttonStyle} onClick = {handleSubmissionCheck} fullWidth>Create an Account</Button>
                </form>
                </FormControl> 
             
                
                     <Link href="/SignIn" style={{color: 'black'}}>
                        Sign In 
                </Link>
               
            </Paper>
        </Grid>
    </div>
    </grid>
  );
}


export default CreateAccount;