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
import Navbar from '../NavBar';
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";
//Dev mode
//const serverURL = "";
//const serverURL = "";
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";
 //enable for dev mode
 //enable for dev mode
//Deployment mode instructions
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
const opacityValue = 0.95;
 
const theme = createTheme({
 palette: {
   type: 'light',
   background: {
     default: "#042913"
   },
   primary: {
     main: '#B08968',
   },
   secondary: {
     main: "#94B395",
   },
 },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "5vh",
    marginLeft: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
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
  <grid>
    <Navbar></Navbar>
   <ThemeProvider theme={theme}>
     <Box
       sx={{
         height: '100vh',
         opacity: opacityValue,
         overflow: "hidden",
         backgroundColor: theme.palette.background.default,
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

         <br></br>
         <br></br>
         <Typography variant="h3" gutterBottom component="div" color='primary' >
           Submit Message
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
            <Typography id='submit' variant="h5">Your message has been received and other users will be alerted!</Typography>
          </div>

        }        
       </MainGridContainer>
     </Box>
   </ThemeProvider>
   </grid>
 );

}


const AlertLocation = (props) => {
 
 const handleInput = (event) => {
   props.handleAlertLocation(event.target.value);
 };
 
 return (

    <div>
      <TextField
        id="alert-location"
        label="Alert Location"
        multiline
        style={{ width: 600 }}
        minRows={2}
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
        id="alert-message"
        label="Alert Message"
        multiline
        style={{ width: 600 }}
        minRows={5}
        variant="outlined"
        helperText="Enter Description of danger"
        value={props.alertMessage}
        onChange = {handleInput}
      />
      {
        props.alertMessage == '' && props.submissionCheck == true ? (
          <div><em style={{color:'red'}}>*Please enter a description. It is a mandatory field.</em></div>) : (<div></div>)
       }
    </div>
  );
}
 

const Home = () => {
 

    return (
      <div> 
        <Dashboard /> 
      </div>     
    )
  };



Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;