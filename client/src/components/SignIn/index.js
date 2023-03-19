import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TextField, Button, Link } from '@material-ui/core'
import { FormControl } from '@material-ui/core';
const cardStyle={padding :30, height:'60vh',width:280, marginTop: "30px", margin:"20px auto"}

const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";

function SignIn() {

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
  
      <Grid>
            <Paper elevation={10} style={cardStyle}>
                <Grid align='center'>
                    <div data-testid="foo">Sign In</div>
                </Grid>
                <FormControl>
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
                
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth  onClick={handleSubmissionCheck} >Sign in</Button>
                </form>
             </FormControl> 
             
                
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






