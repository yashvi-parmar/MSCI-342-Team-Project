import React from 'react';
import {createTheme, ThemeProvider, styled} from "@material-ui/core/styles";
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

//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";
const serverURL = "";

const cardStyle={padding :30,width:380,  color: '#29241C', backgroundColor: '#EDECED'}

const textStyle={marginBottom: '8px'}

const apiKey = "AIzaSyAMqGMEh0eee_qYPGQ1la32w1Y-aKT7LTI";


const opacityValue = 0.95;


const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}


 //enable for dev mode
 //enable for dev mode
//Deployment mode instructions
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
 
const theme = createTheme({
 palette: {
   type: 'light',
   background: {
     default: "#042913"
   },
   primary: {
     main: '#46341C',
   },
   secondary: {
     main: '#46341C',
   },
 },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({

}))

const Alerts = (props) => {
 

 const [alertLocation, setAlertLocation] = React.useState('');
 const [alertMessage, setAlertMessage] = React.useState('');
 const [submissionCheck,setSubmissionCheck] = React.useState(false);
 const [submissionValidation,setSubmissionValidation] = React.useState(false);
 const [submissionData,setSubmissionData] = React.useState([]);
 const [userID,setUserID]=React.useState(1);
 let [AlertData,setAlertData] = React.useState({});
 const [autocomplete, setAutocomplete] = React.useState(null);
 const [destination, setDestination] = React.useState('');
 const [lat,setLat]=React.useState('');
 const [lng,setLng]=React.useState('');
 const [alertsList, setAlertsList] = React.useState([]);

 const handleAutocompleteLoad = (autocomplete) => {
  setAutocomplete(autocomplete);
};
 
const handlePlaceSelect = (place) => {
  setDestination(place.formatted_address);
  setLat(place.geometry.location.lat());
  setLng(place.geometry.location.lng());
  console.log(lat);
  console.log(lng);
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
const handleSubmissionValidation = (event) => {
  console.log("submission was called");
  event.preventDefault();
  if(destination !== '' && alertMessage !== ''){
    let data = {
      alertLocation: alertLocation,
      alertMessage: alertMessage,
      userID: 1,
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



 const callApiAddAlert= async () => {
  const url = serverURL + '/api/addAlert';

  let AlertInfo = {
    "lat": lat,
    "lng" : lng,
    "alertMessage": alertMessage,
    "userID": userID
  };

  console.log(AlertInfo);

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
React.useEffect(() => {
  loadAlerts();
}, []);

const loadAlerts = () => {
  callApiLoadAlerts()
    .then(res => {
      console.log("callApiLoadRecipes returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("callApiLoadRecipes parsed: ", parsed);
      setAlertsList(parsed);
    })
}

const callApiLoadAlerts = async () => {
  const url = serverURL + "/api/getAlerts";
  console.log(url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  
  });
  const body = await response.json();
  console.log(response.status);
  if (response.status !== 200) throw Error(body.message);
  console.log("User settings: ", body);
  return body;
}

return (
  <Grid style={{backgroundColor: '#6D8654', height: '85vh', display: 'flex', padding: '10vh'}}>
   
    <Grid> 
    <h1 style={{color: '#46341C'}}>Submit a Warning</h1>
    
  
    
   <ThemeProvider theme={theme}>
       <MainGridContainer
         container
         spacing={2}
    
         direction="column"
        
         alignItems="center"
       >

         <br></br>
         <br></br>
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
              style={textStyle} 
              multiline 
              label=' Alert Message' 
              helperText="Enter description of danger" 
              variant="outlined"  
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
              color="primary" 
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
       </MainGridContainer>
   </ThemeProvider>
   </Grid>
   <Grid style={{marginLeft: '2vh', alignItems: 'flex-end', }}>
   <h1 style={{color: '#46341C'}}>List of Alerts</h1>
    <div>{alertsList}</div>
    </Grid>
   </Grid>
 );

}


const Home = () => {
    return (
      <div> 
       <NavbarTop></NavbarTop>       
        <br></br>  
        <Alerts /> 
        <Navbar></Navbar>
      </div>     
    )
  };

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;