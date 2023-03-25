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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import '../Home/index.css'
import { useSelector } from 'react-redux';
import store from '../../store';
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";
const serverURL = "";


const cardStyle={padding :'4vh', height:'100%',width:480,  color: '#29241C', backgroundColor: '#EDECED', display: 'flex', flex:1, flexDirection: 'column'}

const textStyle={marginBottom: '8px'}

const apiKey = "AIzaSyAMqGMEh0eee_qYPGQ1la32w1Y-aKT7LTI";


const opacityValue = 0.95;


const buttonStyle={ backgroundColor: '#29241C', color: 'white', fontFamily: 'Oswald'}


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
 
  const userNameGlobal = useSelector((state) => state.user.userNameGlobal);

  React.useEffect(() => {
    console.log('userNameGlobal in MapComponent:', store.getState().user.userNameGlobal);
  }, [userNameGlobal]);


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



 const callApiAddAlert= async () => {
  const url = serverURL + '/api/addAlert';

  let AlertInfo = {
    "lat": lat,
    "lng" : lng,
    "alertMessage": alertMessage,
    "username": store.getState().user.userNameGlobal,
    "address" : destination

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


const alerts = [
  {id: 1, lat: 43.472120, lng:-80.543550, address: 'University of Waterloo', timestamp: "2023-01-10", alert: "avoid area around geese", name: 'YP'}, 

  {id: 1, lat: 43.472120, lng:-80.643550,address: 'University of Waterloo', timestamp: "2023-02-10", alert: "avoid area around ml ", name: 'LS'}, 

]


return (
  <Grid style={{backgroundColor: '#6D8654',fontFamily: 'Noto Sans Lepcha', padding: '10vh', color: 'white', height: '90vh', display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: 1 , justifyContent: 'center'}}>
    <Paper elevation={10} style={cardStyle}> 
    <ThemeProvider theme={theme}> 
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
       </ThemeProvider>
   </Paper>
  
   
   <Grid style={{marginLeft: '5vh'}} >
   <Paper elevation={10} style={cardStyle}> 
    <ThemeProvider theme={theme}> 
    <h1 style={{color: '#29241C', fontFamily: 'Oswald'}}>Alerts</h1>
    <p style={{fontSize: 10, marginTop: '-1vh'}}>Only displays latest 5 messages in your area. Please see map for more alerts.</p>
 
    <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
    {alerts.map(item => (
      <List>
      <ListItem alignItems="flex-start" style={{fontFamily: 'Noto Sans Lepcha', backgroundColor: '#29241C', color: 'white'}}>
        <ListItemAvatar >
          <Avatar style={{fontFamily: 'Noto Sans Lepcha', backgroundColor: 'white', color: '#29241C'}}>{item.name}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item.address}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="white"
              >
                
              </Typography>
              <p style={{color: 'white', margin: '-0.1vh'}}>{item.alert}</p>
              
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider />
      </List>
        ))}
      
      </List>
    
       </ThemeProvider>
   </Paper>
    
    </Grid>
   </Grid>
 );

}


const Home = () => {
    return (
      <div> 
       <NavbarTop></NavbarTop>       
       
        <Alerts /> 
        <Navbar></Navbar>
      </div>     
    )
  };

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Home;