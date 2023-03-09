
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
import Navbar from '../NavBar';
const cardStyle={padding :30, height:'60vh',width:280, marginTop: "30px", margin:"20px auto"}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";

function CreateAccount() {

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [username, setUserName] = React.useState('');
  const [password,setPassword] = React.useState
  const [submissionCheck,setSubmissionCheck] = React.useState(false);
  const [submissionValidation,setSubmissionValidation] = React.useState(false);
  const [submissionData,setSubmissionData] = React.useState([]);
  let [profileData,setProfileData] = React.useState({});

  const handleFirstName = (userFirstname) => {
    setFirstName(userFirstname);
    console.log(userFirstname);
  };

  const handleFirstNameInput= (event) => {
    handleFirstName(event.target.value)
  }
  
  const handleLastName = (userLastname) => {
    setLastName(userLastname);
  };

  const handleLastNameInput= (event) => {
    handleLastName(event.target.value)
  }
 
  const handleEmail = (userEmail) => {
    setEmail(userEmail);
  }

  const handleEmailInput= (event) => {
    handleEmail(event.target.value)
  }

  const handlePhoneNumber= (userPhoneNumber)=>{
    setPhoneNumber(userPhoneNumber);
  }

  const handlePhoneNumberInput= (event) => {
    handlePhoneNumber(event.target.value)
  }

  const handleUserName = (userName) => {
    setUserName(userName);
  }

  const handleUserNameInput = (event) => {
    handleUserName(event.target.value)
  }

  const handlePassword = (userPassword) =>{
    setPassword(userPassword);
  }

  const handlePasswordInput= (event) => {
    handlePassword(event.target.value)
  }
 
 const handleSubmissionCheck = (event) =>{
   setSubmissionCheck(true);
 }
 const handleSubmissionValidation = (event) => {
   event.preventDefault();
   if(firstName != '' && lastName != '' && email != '' && password !='' && phoneNumber != '' && username != ''){
     loadApiAddProfile();
     setFirstName("");
     setLastName("");
     setEmail("");
     setPhoneNumber("");
     setUserName("");
     setPassword("");
     setSubmissionValidation(true);
     setSubmissionCheck(false);
   }
 };
 
 const loadApiAddProfile = () => {
   callApiAddProfile()
     .then((res) => {
       console.log(res.message);
     })
 };
 
 
 
  const callApiAddProfile = async () => {
   const url = serverURL + "/api/addProfile";
 
   let profileInfo = {
     "username": username,
     "email": email,
     "password":password,
     "phoneNumber":phoneNumber,
     "firstName": firstName,
     "lastName": lastName
   };
 
   console.log(profileInfo);
   const response = await fetch(url, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(profileInfo)
   });
   const body = await response.json();
   if (response.status !== 200) throw Error(body.message);
   return body;
 }

  return (
    <grid>
      <Navbar></Navbar>
    <div className="CreateAccount">
       <Grid>
            <Paper elevation={10} style={cardStyle}>
                <Grid align='center'>
                
                    <h2>Create an Account</h2>
                </Grid>
                <TextField style={textStyle} label='First Name' placeholder='Enter First Name' variant="outlined" fullWidth required value={firstName} onChange={handleFirstNameInput}/>
                <TextField style={textStyle} label='Last Name' placeholder='Enter Last Name' variant="outlined" fullWidth required value={lastName} onChange={handleLastNameInput}/>
                <TextField style={textStyle} label='Email' placeholder='Enter Email' variant="outlined" fullWidth required value={email} onChange={handleEmailInput}/>
                <TextField style={textStyle} label='Phone Number' placeholder='Enter Phone Number' variant="outlined" fullWidth required value={phoneNumber} onChange={handlePhoneNumberInput}/>
                <TextField style={textStyle} label='Username' placeholder='Enter Username' variant="outlined" fullWidth required value={username} onChange={handleUserNameInput}/>
                
                <TextField style={textStyle} label='Password' placeholder='Enter Password' type='password' variant="outlined" fullWidth required value={password} onChange={handlePasswordInput}/>   
                
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth>Create an Account</Button>
             
                
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