import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Typography from "@material-ui/core/Typography";
import { TextField } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Navbar from '../NavBar';
import {LoadScript, Autocomplete} from '@react-google-maps/api';
import NavbarTop from '../NavBarTop';
import Paper from "@material-ui/core/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import '../Home/index.css'
import { useSelector } from 'react-redux';
import store from '../../store';

const serverURL = "";
const apiKey = "AIzaSyAMqGMEh0eee_qYPGQ1la32w1Y-aKT7LTI";
const buttonStyle={ backgroundColor: '#29241C', color: 'white', fontFamily: 'Oswald'}
const cardStyle={padding :'4vh', width:480, height: '80vh', color: '#29241C', display: 'flex', flex:1, flexDirection: 'column'}

const theme = createTheme({
  palette: {
    background: {
      default: '#6D8654'
    }
  }
});

const Alerts = (props) => {
 
  //gets the username from the redux store
  const userNameGlobal = useSelector((state) => state.user.userNameGlobal);

  React.useEffect(() => {
    console.log('userNameGlobal in MapComponent:', store.getState().user.userNameGlobal);
  }, [userNameGlobal]);

 const [alertLocation, setAlertLocation] = React.useState('');
 const [alertMessage, setAlertMessage] = React.useState('');
 const [submissionCheck,setSubmissionCheck] = React.useState(false);
 const [submissionValidation,setSubmissionValidation] = React.useState(false);
 const [submissionData,setSubmissionData] = React.useState([]);
 let [AlertData,setAlertData] = React.useState({});
 const [autocomplete, setAutocomplete] = React.useState(null);
 const [destination, setDestination] = React.useState('');
 const [lat,setLat]=React.useState('');
 const [lng,setLng]=React.useState('');

 const handleAutocompleteLoad = (autocomplete) => {
  setAutocomplete(autocomplete);
};

//assigns the destination variables from autocomplete address bar
const handlePlaceSelect = (place) => {
  setDestination(place.formatted_address);
  setLat(place.geometry.location.lat());
  setLng(place.geometry.location.lng());
  console.log(lat);
  console.log(lng);
  console.log(destination);
};

const handleAlertMessage = (message) => {
  setAlertMessage(message);
};

const handleAlertInput = (event) => {
  handleAlertMessage(event.target.value);
}

const handleSubmissionCheck = (event) =>{
  setSubmissionCheck(true);
}

//checks for empty fields and calls API to add alert information to table and resets form
const handleSubmissionValidation = (event) => {
  console.log("submission was called");
  event.preventDefault();
  if(destination !== '' && alertMessage !== ''){
    let data = {
      alertLocation: alertLocation,
      alertMessage: alertMessage,
      username: userNameGlobal,
      address: destination
    }
    setSubmissionData([destination,alertMessage])
    setAlertData(data);
    loadApiAddAlert();
    setDestination("");
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

//calls api to add alert
const callApiAddAlert= async () => {
  const url = serverURL + '/api/addAlert';

  let AlertInfo = {
    "lat": lat,
    "lng" : lng,
    "alertMessage": alertMessage,
    "username": store.getState().user.userNameGlobal,
    "address" : destination

  };
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

let [unsafetext,setUnsafeText]=React.useState([]);

//gets alerts from table on render
React.useEffect(() => {
  loadGetAlerts();
 },[AlertData]);

 const loadGetAlerts =() => {
  callGetAlerts()
    .then(res => {
      //assigns returned data to unsafetext variable
      setUnsafeText(res.alertData);
      console.log(unsafetext);
    });
}

//calls api to get alerts
const callGetAlerts = async() => {
  const url = serverURL + "/api/getTop5Alerts";
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

//renders form for submit warning, includes autcomplete address bar for location of warning and description of warning
//displays the last 4 alerts on the side for users to see including location, letter avatar of user, and description of danger
return (
  
  <Grid style={{ fontFamily: 'Noto Sans Lepcha', padding: '10vh', display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: 1 , justifyContent: 'center'}}>
    <Paper elevation={10} style={cardStyle}> 
    <h1 style={{color: '#29241C', fontFamily: 'Oswald'}}>Submit a Warning</h1>
         <LoadScript
          googleMapsApiKey = {apiKey}
          libraries={['places']}
        >  
         <FormControl>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
           <Autocomplete 
              onLoad={handleAutocompleteLoad} 
              onPlaceChanged={() => handlePlaceSelect(autocomplete.getPlace())}
              options={{ componentRestrictions: { country: "ca" } }}
            >
            <TextField
              id="destination"
              type="text"
              placeholder="Destination"
              style={{ width: '400px'}}
              helperText="Enter location of danger"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            </Autocomplete>
           {
              destination === '' && submissionCheck === true ? (
                <div><em style={{color:'red'}}>*Please enter the location. It is a mandatory field.</em></div>) : (<div></div>)
           }
             <br></br>
             <br></br>
             <TextField 
              id = "alertMessage"
              multiline 
              label='Alert Message' 
              helperText="Enter description of danger" 
              variant="outlined" 
              style={{ width: '400px'}} 
              minRows={5} 
              value={alertMessage} 
              onChange = {handleAlertInput} 
             />
             {
                alertMessage === '' && submissionCheck === true ? (
                  <div><em style={{color:'red'}}>*Please enter a description. It is a mandatory field.</em></div>) : (<div></div>)
              }
             <br></br>
             <br></br>
             <Button 
              variant="contained" 
              style={buttonStyle}
              type ='submit' 
              onClick={handleSubmissionCheck}
              >
                Submit
             </Button>
           </form>
         </FormControl> 
         </LoadScript>                              
         {
          submissionValidation === true && alertMessage === '' && destination === '' &&
          <div>
            <br></br>
            <Typography id='submit' variant="h5">Your message has been received and other users will be alerted!</Typography>
          </div>

        }        
   </Paper>
   <Grid style={{marginLeft: '5vh'}} >
   <Paper elevation={10} style={cardStyle}> 
    <h1 style={{color: '#29241C', fontFamily: 'Oswald'}}>Alerts</h1>
    <p style={{fontSize: 10, marginTop: '-1vh'}}>Only displays latest 4 messages in your area. Please see map for more alerts.</p>
 
    <List sx={{ width: '100%', maxWidth: 460}}>
    {unsafetext.map(item => (
      <List>
      <ListItem alignItems="flex-start" style={{borderRadius: '5px', fontFamily: 'Noto Sans Lepcha', backgroundColor: '#29241C', color: 'white'}}>
        <ListItemAvatar >
          <Avatar style={{fontFamily: 'Noto Sans Lepcha', backgroundColor: '#EBD6C1', color: '#B08968'}}>{item.username.charAt(0).toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item.address}
          secondary={
            <React.Fragment>
              <p style={{color: 'white', margin: '-0.1vh'}}>{item.alert}</p>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
      </List>
        ))}
      </List>  
   </Paper>
    </Grid>
   </Grid>
 );

}



const Home = () => {
    return (
      <ThemeProvider theme={theme}>
      <Grid > 
       <NavbarTop></NavbarTop>       
        <Alerts /> 
        <Navbar></Navbar>
      </Grid>     
      </ThemeProvider>
    )
  };

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;