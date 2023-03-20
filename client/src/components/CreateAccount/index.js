
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TextField, Button, Link } from '@material-ui/core'
import { FormControl } from '@material-ui/core';
import Navbar from '../NavBar';
import { useHistory } from 'react-router-dom';
const cardStyle={padding :30, height:'55vh',width:280,  margin:"20px auto", marginTop: "10vh", backgroundColor: '#E6CCB2', color: '#6F4E37'}
const buttonStyle={margin:'8px 0', backgroundColor: '#2E5129', color: 'white', marginTop: '5vh'}
const textStyle={marginBottom: '8px', width: '30vh', color: 'black'}
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
 const history = useHistory();
 const [value, setValue] = React.useState(0);
 const handleChange = (newValue) => {
  history.push(`${newValue}`);
  console.log(newValue)
  setValue(newValue);
};
 const handleSubmissionCheck = (event) =>{
  setSubmissionCheck(true)
  handleChange("/")
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
     
    <div className="CreateAccount">
       <Grid>
            <Paper align='center' elevation={10} style={cardStyle}>
                <Grid align='center'>
                
                    <h2>Create an Account</h2>
                </Grid>
                <FormControl>
                <form autoComplete='off' onSubmit={handleSubmissionValidation}>
                <TextField 
           
                
              required style={textStyle} label='Username' placeholder='Enter username' variant="outlined" fullWidth value={username} onChange={handleUsernameInput} />
                  {
                    username === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
                <TextField required style={textStyle} label='Email' placeholder='Enter email' variant="outlined" fullWidth value={email} onChange={handleEmailInput} />
                  {
                    email === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your email!</em></div>) : (<div></div>)
                  }
                
                <TextField required style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth value={password} onChange={handlePasswordInput} />
                  {
                    password === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your password!</em></div>) : (<div></div>)
                  }
                <TextField required style={textStyle} label='Re-enter Password' placeholder='Re-enter password' type='password' variant="outlined" fullWidth value={passwordReenter} onChange={handlePasswordReenterInput} />
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
             
                <div style={{marginTop: "1vh" }} ></div>
                     <Link href="/SignIn" style={{color: '#2E5129'}}>
                       OR SIGN IN
                </Link>
               
            </Paper>
        </Grid>
    </div>
    </grid>
  );
}


export default CreateAccount;