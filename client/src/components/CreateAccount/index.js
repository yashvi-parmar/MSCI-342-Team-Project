import React, {useEffect,useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TextField, Button, Link } from '@material-ui/core'
import { FormControl } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { setUsernameGlobal } from '../../actions/user';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const cardStyle={padding :90, height:'95%',width:280,  color: '#29241C', backgroundColor: '#EDECED'}
const buttonStyle={margin:'8px 0', backgroundColor: '#6D8654', color: '#29241C', marginTop: '5vh', borderRadius: 35, height: '50px'}
const textStyle={marginBottom: '2vh',  color: 'black', width: '280px'}
const serverURL = "";
const theme = createTheme({
  palette: {
    background: {
      default: '#6D8654'
    }
  }
});

 function CreateAccount() {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordReenter, setPasswordReenter]=React.useState('');
    const [usernameExists, setUsernameExists] = React.useState(false);
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

  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
 
  //gets the users current position
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
    );
  }, []);

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

  //submision validation for creating an account
  const handleSubmissionValidation = (event) => {
    event.preventDefault();
    if(password !== '' && username !=='' && email !== '' && passwordReenter !== '' && (password===passwordReenter)){
      loadApiCheckUser();
    }
  };

  const dispatch = useDispatch();

  //checks if the user exists or not already
  const loadApiCheckUser = () => {
    callApiCheckUser()
      .then((res) => {
          var parsed = JSON.parse(res.data);
          if(parsed == ""){
            loadApiAddProfile();
            dispatch(setUsernameGlobal(username));
            setPasswordReenter('');
            setSubmissionValidation(true);
            setSubmissionCheck(false);
            handleChange("/Home")
          }else if (parsed != ""){
              setSubmissionCheck(false);
              setUsername('');
              setPassword('');
              setPasswordReenter('');
              setUsernameExists(true);
          }
      })
  };

  const callApiCheckUser = async () => {
    const url = serverURL + "/api/checkAccount";
    let searchInfo = {
      "username": username,
    };
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
          var parsed = JSON.parse(res.data);
      })
  };

  const callApiAddProfile = async () => {
    const url = serverURL + "/api/addProfile";
    let searchInfo = {
      "username": username,
      "email": email,
      "password":password,
      "firstName": firstName,
      "lastName": lastName,
      "lat" : lat,
      "lng" : lng  
    };
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
    <ThemeProvider theme={theme}>
    <Grid style={{backgroundColor: '#6D8654', color: '#29241C'}}>
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
                <TextField style={textStyle} label='First Name' placeholder='Enter first name' variant="outlined" fullWidth value={firstName} onChange={handleFirstNameInput} />
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
                                    {
                    usernameExists === true ?  (
                    <div><em style={{color:'red'}}>*Username is taken, please try a different username!</em></div>) : (<div></div>)
                  }
                
                <Button type='submit' variant="contained" style={buttonStyle} onClick = {handleSubmissionCheck} fullWidth><h3 style={{letterSpacing: '0.05rem', color: '#EDECED'}}>GET STARTED</h3></Button>
                </form>
                </FormControl> 
             <div style={{marginTop: "1vh" }} ></div>
                     <Link href="/" style={{color: '#131411'}}>
                        OR LOGIN
                </Link>
            </Paper>
            </Grid>
        </Grid>  
    </Grid>
    </ThemeProvider> 
  );
}
export default CreateAccount;