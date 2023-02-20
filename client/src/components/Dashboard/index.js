import React, { Component, useEffect } from 'react';
import {createTheme, ThemeProvider, styled} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemButton from '@material-ui/core/ListItemButton';
import history from '../Navigation/history';
//import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from "@material-ui/core/Menu";
import Toolbar from '@material-ui/core/Toolbar';

//Dev mode
//const serverURL = "";
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";
 //enable for dev mode
 //enable for dev mode
//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
const opacityValue = 0.9;
 
const lightTheme = createTheme({
 palette: {
   type: 'light',
   background: {
     default: "#ffffff"
   },
   primary: {
     main: '#ef9a9a',
     light: '#94b395',
     dark: '#2e5129',
     background: '#e6ccb2'
   },
   secondary: {
     main: "#b71c1c",
     light: '#f05545',
     dark: '#7f0000'
   },
 },
});
 

const MainGridContainer = styled(Grid)(({ theme }) => ({
 margin: theme.spacing(4),
}))

const Dashboard = (props) => {
 

 const [alertLocation, setAlertLocation] = React.useState('');
 const [alertMessage, setAlertMessage] = React.useState('');
 const [submissionCheck,setSubmissionCheck] = React.useState(false);
 const [submissionValidation,setSubmissionValidation] = React.useState(false);
 const [submissionData,setSubmissionData] = React.useState([]);
 const [userID,setUserID]=React.useState(1);
 let [AlertData,setAlertData] = React.useState({});
 

 const handleAlertLocation = (title) => {
  setAlertLocation(title);
};

const handleAlertMessage = (body) => {
  setAlertMessage(body);
};

const handleSubmissionCheck = (event) =>{
  setSubmissionCheck(true);
}
const handleSubmissionValidation = (event) => {
  event.preventDefault();
  if(alertLocation != '' && alertMessage != ''){
    let data = {
      alertLocation: alertLocation,
      alertMessage: alertMessage,
      userID: 1,
    }
    setSubmissionData([alertLocation,alertMessage])
    setAlertData(data);
    loadApiAddAlert();
    setAlertLocation("");
    setAlertMessage("");
    setSubmissionValidation(true);
    setSubmissionCheck(false);
  }
};

const loadApiAddAlert = () => {
  callApiAddAlert()
    .then((res) => {
      console.log(res.message);
    })
};



 const callApiAddAlert= async () => {
  const url = serverURL + "/api/addReview";

  let AlertInfo = {
    "alertLocation": alertLocation,
    "alertMessage": alertMessage,
    "userID": userID
  };

  console.log(AlertInfo);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(AlertInfo)
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

return (
   <ThemeProvider theme={lightTheme}>
     <Box
       sx={{
         height: '100vh',
         opacity: opacityValue,
         overflow: "hidden",
         backgroundColor: lightTheme.palette.background.default,
 
       }}
     >
       <MainGridContainer
         container
         spacing={3}
         style={{ maxWidth: '50%' }}
         direction="column"
         justify="flex-start"
         alignItems="stretch"
       >
         <Typography variant="h3" gutterBottom component="div">
           Movie Review
         </Typography>
 
         <FormControl>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
             <AlertLocation handleAlertLocation={handleAlertLocation} alertLocation={alertLocation} submissionCheck={submissionCheck}/>
             <br></br>
             <br></br>
             <AlertMessage handleAlertMessage = {handleAlertMessage} alertMessage = {alertMessage} submissionCheck={submissionCheck}/>
             <br></br>
             <br></br>
             <Button variant="contained" color="primary" type ='submit' onClick={handleSubmissionCheck}>Submit</Button>
           </form>
         </FormControl>                               
         {
          submissionValidation == true &&
          <div>
            <br></br>
            <Typography variant="h5">Your message has been received and other users will be alerted!</Typography>
          </div>

        }        
       </MainGridContainer>
     </Box>
   </ThemeProvider>
 );

}




const AlertLocation = (props) => {
 
 const handleInput = (event) => {
   props.handlealertLocation(event.target.value);
 };
 
 return (

    <div>
      <TextField
        id="outlined-multiline-flexible"
        label="AlertLocation"
        multiline
        style={{ width: 600 }}
        minRows={5}
        defaultValue="Location"
        variant="outlined"
        helperText="Enter Location of danger"
        value={props.alertMessage}
        onChange = {handleInput}
      />
       {
         props.alertLocation == '' && props.submissionCheck == true ? (
          <div><em style={{color:'red'}}>*Please enter the location. It is a mandatory field.</em></div>) : (<div></div>)
      }
    </div>
);
}

const AlertMessage = (props) => {
 
 const handleInput = (event) => {
   props.handleAlertMessage(event.target.value);
 };
 
  return (
    <div>
    <TextField
        id="outlined-multiline-flexible"
        label="AlertMessage"
        multiline
        style={{ width: 600 }}
        minRows={5}
        defaultValue="Description of danger"
        variant="outlined"
        helperText="Enter Description of danger"
        value={props.alertMessage}
        onChange = {handleInput}
      />
      {
        props.alertMessage == '' && props.submissionCheck == true ? (
          <div><em style={{color:'red'}}>*Please enter a description. It is a mandatory field!</em></div>) : (<div></div>)
       }
    </div>
  );
}
 

const Home = () => {
 /**
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
   }
  */ 

  let [userId,setUserID] = React.useState(1);
  let [mode,setMode]=React.useState(0);
  let [alerts,setAlerts]=React.useState([]);
  




  React.useEffect(() => {
    //loadUserSettings();
    loadGetAlerts();
   },[]);


   const loadUserSettings =() => {
    this.callApiLoadUserSettings()
      .then(res => {
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  const loadGetAlerts =() => {
    callGetAlerts()
      .then(res => {
        setAlerts(res.alertData);
      });
  }
  
   const callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
  
  const callGetAlerts = async() => {
    
    //console.log('t',url)
    const url = serverURL + "/api/getAlerts";
    console.log(url)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
    });
    const body =await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }


    return (
      <div> 
        <Dashboard alerts={alerts}/> 
      </div>     
    )
  };



Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;