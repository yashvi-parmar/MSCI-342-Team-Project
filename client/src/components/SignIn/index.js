import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Avatar, TextField, Button, Link, FormControl } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CreateAccount from '../CreateAccount'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
const cardStyle={padding :30, height:'60vh',width:280, marginTop: "30px", margin:"20px auto"}

const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}

const apiKey = "AIzaSyAMqGMEh0eee_qYPGQ1la32w1Y-aKT7LTI";
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";

function SignIn() {

  const [username, setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [submissionCheck,setSubmissionCheck] = React.useState(false);
  const [submissionValidation,setSubmissionValidation] = React.useState(false);
  const [submissionData,setSubmissionData] = React.useState([]);
  let [searchData,setSearchData] = React.useState([]);
  let [searchAnswer,setSearchAnswer] = React.useState([]);


  const handleUsername = (usernameCheck) => {
    setUsername(usernameCheck);
    console.log(username);
  }

  const handleUsernameInput = (event) => {
    handleUsername(event.target.value);
  }

  const handlePassword = (passwordCheck) => {
    setPassword(passwordCheck);
  }

  const handlePasswordInput = (event) => {
    handlePassword(event.target.value);
  }

  const handleSubmissionCheck = (event) =>{
    setSubmissionCheck(true);
    handleSubmissionValidation();
    event.preventDefault();
    
  }
  
  const handleSubmissionValidation = () => {
    if(username != '' && password != ''){
      let data = {
        username: username,
        password: password
      }
      setSubmissionData([data])
      reverseGeocoding();
      setUsername('');
      setPassword('');
      setSubmissionCheck(false);
    }
  }  

  React.useEffect(() => {
    loadApiSearchUser();
  }, [submissionData]);

  const loadApiSearchUser = () => {
    callApiSearchUser()
      .then((res) => {
        console.log(res)
          var parsed = JSON.parse(res.data);
          console.log(parsed[0]);
          setSearchAnswer(parsed);
      })
  };
  
  const callApiSearchUser = async () => {
    const url = serverURL + "/api/searchUser";
    console.log(url)
  
    let searchInfo = {
      "username": username,
      "password": password,
    };
  
    console.log(searchInfo);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchInfo)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }



  const reverseGeocoding= () => {
    // First, check if the Geolocation API is supported by the browser
if (navigator.geolocation) {
  // If it is, get the user's current position
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    function(position) {
      // Get the latitude and longitude from the position object
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
          // Parse the response data to get the formatted address
          const formattedAddress = data.results[0].formatted_address;
          console.log(`Your current address is: ${formattedAddress}`);
        })
        .catch(error => console.error(error));
    },
    // Error callback function
    function(error) {
      console.error(`Geolocation error (${error.code}): ${error.message}`);
    }
  );
} else {
  console.error('Geolocation is not supported by this browser.');
}

  }  

  return (
<>
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
                  variant="outlined"  
                  value={username}
                  onChange={handleUsernameInput}/>
                    {
                      username == '' && submissionCheck == true ? (
                      <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                    }
                  <TextField style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth value={password} onChange={handlePasswordInput} required/>
                    {
                      password == '' && submissionCheck == true ? (
                      <div><em style={{color:'red'}}>*Please enter your password!</em></div>) : (<div></div>)
                    }
                  
                  <Button type='submit' variant="contained" style={buttonStyle} fullWidth onClick={handleSubmissionCheck}>Sign in</Button>                       
                     <Link href="/CreateAccount" style={{color: 'black'}}>
                        Create an Account 
                </Link>
               
            </Paper>
        </Grid>
       
    </div>
    </>
  );
}

export default SignIn;
