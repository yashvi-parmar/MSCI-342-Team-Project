import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import {Avatar, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
import { useHistory } from 'react-router-dom';
import {createTheme, ThemeProvider, styled} from "@material-ui/core/styles";
const cardStyle={padding :90, height:'95%',width:280,  color: '#29241C', backgroundColor: '#EDECED'}
const buttonStyle={margin:'8px 0', backgroundColor: '#6D8654', color: '#29241C', marginTop: '5vh', borderRadius: 35, height: '50px'}
const textStyle={marginBottom: '2vh',  color: 'black', width: '280px'}
const serverURL = "";
const theme = createTheme({
  palette: {
    type: 'light',
    background: {
      default: "#6D8654"
    },
    primary: {
      main: '#29241C',
    },
    secondary: {
      main: "#29241C",
    },
  },
 });
 

 function CreateAccount() {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordReenter, setPasswordReenter]=React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [submissionCheck, setSubmissionCheck]=React.useState(false);
    const [searchAnswer,setSearchAnswer] = React.useState('');
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

   const handleFirstName = (firstName) => {
    setFirstName(firstName);
  };
 
  const handleFirstNameInput = (event) => {
     handleFirstName(event.target.value)
  }

  const handleLastName = (lastName) => {
    setLastName(lastName);
  };
 
  const handleLastNameInput = (event) => {
     handleLastName(event.target.value)
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
    
  }
  const handleSubmissionValidation = (event) => {
    event.preventDefault();
    if(password !== '' && username !=='' && email !== '' && passwordReenter !== '' && (password===passwordReenter)){
      loadApiCheckUser();
      if(searchAnswer === ''){
        loadApiAddProfile();
        setUsername('');
        setPassword('');
        setEmail('');
        setPasswordReenter('');
        setSubmissionValidation(true);
        setSubmissionCheck(false);
        handleChange("/")
      }
    }
  };

  const loadApiCheckUser = () => {
    callApiCheckUser()
      .then((res) => {
        console.log(res)
          var parsed = JSON.parse(res.data);
          console.log(parsed[0]);
          setSearchAnswer(parsed);
      })
  };

  const callApiCheckUser = async () => {
    const url = serverURL + "/api/CheckUser";
    console.log(url)
  
    let searchInfo = {
      "username": username,
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

  const loadApiAddProfile = () => {
    callApiAddProfile()
      .then((res) => {
        console.log(res)
          var parsed = JSON.parse(res.data);
          console.log(parsed[0]);
          setSearchAnswer(parsed);
      })
  };

  const callApiAddProfile = async () => {
    const url = serverURL + "/api/addProfile";
    console.log(url)
  
    let searchInfo = {
      "username": username,
      "email": email,
      "password":password,
      "firstName": firstName,
      "lastName": lastName
      
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

  return (
    <Grid style={{backgroundColor: '#6D8654', height: '100vh', color: '#29241C'}}>
     <ThemeProvider theme={theme}>
       
    
  
      <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '5vh'}} >
      <Grid style={{display: 'flex', flexDirection: 'column', flexBasis: '100%', flex: 1}}>
        <h3 style={{letterSpacing: '0.05rem', color: '#EDECED'}}>Welcome to Bark!</h3>
       </Grid>
        <Grid style={{display: 'flex', flexDirection: 'column', flexBasis: '100%', flex: 1}}>
            <Paper align='center'  elevation={10} style={cardStyle}>
                <Grid align='center'>
                <h3 style={{letterSpacing: '0.05rem', color: '#29241C', marginTop: '-20px'}}>Register</h3>
                </Grid>
                <FormControl>
                <form autoComplete='off' onSubmit={handleSubmissionValidation}>
                <TextField style={textStyle} label='First Name' placeholder='Enter first name' variant="outlined" fullWidth value={firstName} onChange={handleFirstName} />
                  {
                    firstName === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
                <TextField style={textStyle} label='Last Name' placeholder='Enter last name' variant="outlined" fullWidth value={lastName} onChange={handleLastNameInput} />
                  {
                    lastName === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
                <TextField 
           
                
               style={textStyle} label='Username' placeholder='Enter username' variant="outlined" fullWidth value={username} onChange={handleUsernameInput} />
                  {
                    username === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
                <TextField  style={textStyle} label='Email' placeholder='Enter email' variant="outlined" fullWidth value={email} onChange={handleEmailInput} />
                  {
                    email === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your email!</em></div>) : (<div></div>)
                  }
                
                <TextField  style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth value={password} onChange={handlePasswordInput} />
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
                
                <Button type='submit' variant="contained" style={buttonStyle} onClick = {handleSubmissionCheck} fullWidth><h3 style={{letterSpacing: '0.05rem', color: '#EDECED'}}>GET STARTED</h3></Button>
                </form>
                </FormControl> 
             
             <div style={{marginTop: "1vh" }} ></div>
                     <Link href="/SignIn" style={{color: '#131411'}}>
                        OR LOGIN
                </Link>
               
            </Paper>
            </Grid>
            
        </Grid>
       
    
  
   </ThemeProvider>
  
    </Grid>
  );
}

export default CreateAccount;