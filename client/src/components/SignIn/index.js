import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TextField, Button, Link } from '@material-ui/core'
import { FormControl} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import { Provider } from 'react-redux';
import store from '../../store/index';
import { setUsernameGlobal } from '../../actions/user';
import { useSelector, useDispatch } from 'react-redux';

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
 
function SignIn() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [searchAnswer,setSearchAnswer] = React.useState('');
  const [submissionCheck, setSubmissionCheck]=React.useState(false);
  const [submissionValidation,setSubmissionValidation] = React.useState(false);
  const [matchRecord,setMatchRecord] = React.useState(true);

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
  
 const [lat, setLat] = React.useState(null);
 const [lng, setLng] = React.useState(null);

 React.useEffect(() => {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       setLat(position.coords.latitude);
       setLng(position.coords.longitude);
     },
   );
 }, []);

const userNameGlobal = useSelector((state) => state.user.userNameGlobal);
const dispatch = useDispatch();
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
    if(password !== '' && username !==''){
      loadApiSearchUser();
    }
  };

//searchs if the user is already in the database
const loadApiSearchUser = () => {
    callApiSearchUser()
      .then((res) => {
        console.log(res)
          var parsed = JSON.parse(res.data);
          console.log(parsed[0]);
          if(parsed != ""){
            setSubmissionValidation(true);
            loadApiAddLastSeenLocation();
            dispatch(setUsernameGlobal(username));
            handleChange("/Home");
            setUsername('');
            setPassword('');
          }else{
            {
              setMatchRecord(false);
              setSubmissionCheck(false);
              setUsername('');
              setPassword('');
            }
          }
      })
};

const [localUserName, setLocalUserName] = useState('');

//updates the global username when it changes
useEffect(() => {
  setLocalUserName(userNameGlobal);
}, [userNameGlobal]);

//sets the new global username
useEffect(() => {
  dispatch(setUsernameGlobal(''));
},[]);

const callApiSearchUser = async () => {
    const url = serverURL + "/api/SearchUser";
    console.log(url)
  
    let searchInfo = {
      "username": username,
      "password": password
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

  //adds the last seen location of the user
  const loadApiAddLastSeenLocation = () => {
    callApiAddLastSeenLocation()
      .then((res) => {
        console.log(res)
          var parsed = JSON.parse(res.data);
          console.log(parsed[0]);
      })
  };

  const callApiAddLastSeenLocation = async () => {
    const url = serverURL + "/api/UpdateLastSeenLocated";
    console.log(url)
    let searchInfo = {
      "username" : username,
      "latitude": lat,
      "longitude": lng
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
    <Provider store={store}>
    <Grid style={{backgroundColor: '#6D8654', height: '100vh', color: '#29241C'}}>
     <ThemeProvider theme={theme}>  
      <Grid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '5vh'}} >
      <Grid style={{display: 'flex', flexDirection: 'column', flexBasis: '100%', flex: 1}}>
        <h3 style={{letterSpacing: '0.05rem', color: '#EDECED'}}>Good to See You Again,</h3>
       </Grid>
        <Grid style={{display: 'flex', flexDirection: 'column', flexBasis: '100%', flex: 1}}>
            <Paper align='center'  elevation={10} style={cardStyle}>
                <Grid align='center'>
                <h3 style={{letterSpacing: '0.05rem', color: '#29241C', marginTop: '-20px'}}>Login</h3>
                </Grid>
                <FormControl style={{marginTop: '4vh'}}>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
                <TextField id = "username" style={textStyle} label='Username' placeholder='Enter username' variant="outlined" value={username} onChange = {handleUsernameInput} />
                  {
                    username === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your username!</em></div>) : (<div></div>)
                  }
                <TextField id = "password" style={textStyle} label='Password' placeholder='Enter password' type='password' variant="outlined" value = {password} onChange={handlePasswordInput} fullWidth />
                {
                    password === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your password!</em></div>) : (<div></div>)
                  }
                <Button id = "LOGIN" type='submit' variant="contained" style={buttonStyle} fullWidth  onClick={handleSubmissionCheck} ><h3 style={{letterSpacing: '0.05rem', color: '#EDECED'}}>LOGIN</h3></Button>
                {
                    matchRecord == false ? (
                    <div><em style={{color:'red'}}>*Your credentials do not match our records! Please try again</em></div>) : (<div></div>)
                  }
                </form>
             </FormControl> 
             <div style={{marginTop: "1vh" }} ></div>
                     <Link href="/CreateAccount" style={{color: '#131411'}}>
                        OR CREATE AN ACCOUNT 
                </Link>
            </Paper>
            </Grid>   
        </Grid>
   </ThemeProvider>
    </Grid>
    </Provider>
  );
}
export default SignIn;