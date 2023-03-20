import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import {Avatar, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CreateAccount from '../CreateAccount'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
import { useHistory } from 'react-router-dom';

const cardStyle={padding :30, height:'55vh',width:280,  margin:"20px auto", marginTop: "10vh"}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white', marginTop: '5vh'}
const textStyle={marginBottom: '8px', width: '30vh', color: 'black'}
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
            <Paper align='center'  elevation={10} style={cardStyle}>
                <Grid align='center'>
                <h2>Sign In</h2>
                </Grid>
                <FormControl style={{marginTop: '4vh'}}>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
                <TextField  required style={textStyle} label='Username' placeholder='Enter username' variant="outlined" value={username} onChange = {handleUsernameInput} />
                  {
                    username === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
  
                <TextField required style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" value = {password} onChange={handlePasswordInput} fullWidth />
                {
                    password === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your password!</em></div>) : (<div></div>)
                  }
                
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth  onClick={handleSubmissionCheck} >Sign in</Button>
                </form>
             </FormControl> 
             
             <div style={{marginTop: "1vh" }} ></div>
                     <Link href="/CreateAccount" style={{color: 'black'}}>
                        OR CREATE AN ACCOUNT 
                </Link>
               
            </Paper>
        </Grid>
       
    </div>
    </grid>
  );
}

export default SignIn;






