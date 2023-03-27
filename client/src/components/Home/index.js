import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import Share from '../Share';
import Dog from './dog.png';
import Dog2 from './dog2.png';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import Typography from "@material-ui/core/Typography";
import {TextField, Button} from '@material-ui/core'
import './index.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import MapFxn from '../Map/index.js'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import fakePhoneCall from "../Map/assets/fakePhoneCall.wav"

import MenuItem from '@mui/material/MenuItem';
import DialogContentText from '@mui/material/DialogContentText';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {GoogleMap, LoadScript, Marker, DirectionsRenderer, Autocomplete, TrafficLayer, Circle, InfoBox} from '@react-google-maps/api';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import store from '../../store';
import call from 'react-native-phone-call';


const serverURL = ""; //enable for deployed mode; Change PORT to the port number given to you;



  const buttonStyle={margin:'8px 0', marginTop: '-2vh', width: '30vh', height: '6vh', backgroundColor: '#29241C',  marginRight: '10px', marginBottom: '2vh', color: 'white', fontFamily: 'Oswald', letterSpacing: '0.05rem'} 

  const textStyle={marginBottom: '8px'}
  const fetch = require("node-fetch");
  

const AddEmergencyContactForm = () => {
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [submissionCheck, setSubmissionCheck]=React.useState(false)
  const [submissionValidation,setSubmissionValidation] = React.useState(false);

  const handlePhoneNumber = (phoneNumber) => {
    setPhoneNumber(phoneNumber);
  };

  const handlePhoneNumberInput = (event) => {
    handlePhoneNumber(event.target.value)
 }
 
  const handleName = (name) => {
   setName(name);
 };

 const handleNameInput = (event) => {
    handleName(event.target.value)
 }
  
  
  
 const handleSubmissionCheck = (event) =>{
    setSubmissionCheck(true);
  }
  const handleSubmissionValidation = (event) => {
    event.preventDefault();
    if(phoneNumber !== '' && name !==''){
      setName('');
      setPhoneNumber('');
      setSubmissionValidation(true);
      setSubmissionCheck(false);
      loadApiAddEmergencyContact();
    }
  };

  const loadApiAddEmergencyContact = () => {
    callApiAddEmergencyContact()
      .then((res) => {
        console.log(res.message);
      })
  };
  
   const callApiAddEmergencyContact= async () => {
    const url = serverURL + '/api/addEmergencyContacts';
  
    let FriendInfo = { 
      "username": store.getState().user.userNameGlobal,
      "contactName" : name,
      "contactPhoneNumber" : phoneNumber
      
    };
  
    console.log(FriendInfo);
  
    console.log(FriendInfo);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(FriendInfo)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
  

  return (
      <Grid>
                <FormControl>
           <form autoComplete='off' onSubmit={handleSubmissionValidation}>
              <br></br>
                <TextField style={textStyle} label='Name' placeholder='Enter name' variant="outlined" value={name} onChange = {handleNameInput} />
                  {
                    name === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your emergency contact's name!</em></div>) : (<div></div>)
                  }
  
                <TextField style={textStyle} label='Phone Number' placeholder='Enter phone number' variant="outlined" value = {phoneNumber} onChange={handlePhoneNumberInput} fullWidth />
                {
                    phoneNumber === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your emergency contact's phone number!</em></div>) : (<div></div>)
                  }
                <br></br>
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth  onClick={handleSubmissionCheck} >ADD EMERGENCY CONTACT</Button>
                </form>
             </FormControl> 
        </Grid>
  );
}
  

const Home = () => {
  const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
  const REACT_APP_API_KEY = '767a9a6ec8856b1d5f4e998eb195f561'
  const REACT_APP_ICON_URL = 'https://openweathermap.org/img/w'
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [name, setName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const[isLoading, setIsLoading]=useState(true);
  const [data, setData] = useState([]);
  const userNameGlobal = useSelector((state) => state.user.userNameGlobal);
  const [alertData,setAlertData] = React.useState([]);

  React.useEffect(() => {
    loadGetYourAlerts();
   },[]);
  
  const loadGetYourAlerts =() => {
    callGetYourAlerts()
      .then(res => {
        setAlertData(res.obj);
        console.log("data: " + alertData);
  });
  }
  const callGetYourAlerts = async() => {
    const url = serverURL + "/api/getYourAlerts";
    console.log(url)
    let AlertInfo = {
      "username": store.getState().user.userNameGlobal,
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

  useEffect(() => {
    console.log('userNameGlobal in HomeComponent:', store.getState().user.userNameGlobal);
  }, [userNameGlobal]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false)
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        setIsLoading(false)
      });

      await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+lat+ '%2C%20'+long+'?unitGroup=metric&key=MAZHFUCY2KGK2HWE6BNYH6JAM&contentType=json')
      .then(res => res.json())
      .then(result => {
        if (result != undefined){
          setData(result)
        setIsLoading(false)
       console.log(result)
        }
        
        
        
      });
    }
    setIsLoading(false)
    
    fetchData();
  }, [lat,long])
  
  const weather = () => {
    console.log(data)
  }
  const runButton = event => {
 
    event.preventDefault();
    var copyText = "this is the link";
    navigator.clipboard.writeText(copyText).then(() => {
    alert("Link copied to clipboard!");
});
}
const [directions, setDirections] = useState(null);
const [origin, setOrigin] = useState('');
const [destination, setDestination] = useState('');

const directionsCallback = (response) => {
  if (response !== null) {
    setDirections(response);
  }
};

const names = userNameGlobal
const [emergencyContactsOption,setEmergencyContactsOption]=React.useState("");
const [showTextField, setShowTextField] = useState(false);
const [showEmergencyContact,setShowEmergencyContact]= useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleChangeEmergencyOptions = (event) => {
  setEmergencyContactsOption(event.target.value);
  setShowTextField(event.target.value === "Add emergency contacts");
  setShowEmergencyContact(event.target.value === "View emergency contacts");
};

const [openFakeCall, setOpenFakeCall]=React.useState(false);

const handleClickOpenPhoneCall = () => {
  setOpenFakeCall(true);
};

const handleClosePhoneCall = () => {
  setOpenFakeCall(false);
};

let audio = new Audio(fakePhoneCall);

const playPhoneCall = () => {
  audio.play();

}


let [friendsEmails, setFriendsEmails] = React.useState([]);
React.useEffect(() => {
  getFriendsEmails();
}, []);

const getFriendsEmails = () => {
  callAPIGetFriendsEmails()
    .then(res => {
      setFriendsEmails(res.friendEmailData);
    })
}

const callAPIGetFriendsEmails = async() => {
  const url = serverURL + "/api/getFriendsEmails";
  console.log(url);

  let userData = {
    "username": store.getState().user.userNameGlobal
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData)
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  console.log(body);
  return body;
}

const handleSendFriendsEmail = () => {
  const allFriendEmails = friendsEmails.map((friendsEmails) => friendsEmails.email);
  const subject = "Made It To My Destination Safely!";
  const body = "I love BARK!";
  const mailtoURL = `mailto:?bcc=${encodeURIComponent(allFriendEmails)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoURL);
}

const [emergencyContacts, setEmergencyContacts] = React.useState([]);


React.useEffect(() => {
  loadGetEmergencyContacts();
 },[showEmergencyContact]);

const loadGetEmergencyContacts =() => {
  callGetEmergencyContacts()
    .then(res => {
      setEmergencyContacts(res.obj);
      console.log("friends:" + emergencyContacts)
});
}
const callGetEmergencyContacts = async() => {
  const url = serverURL + "/api/getEmergencyContacts";
  console.log(url)
  let contactInfo = {
    "username": store.getState().user.userNameGlobal,
  };

  console.log(contactInfo);

  console.log(contactInfo);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactInfo)
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

//calls number (911 functionality)
const handlePhoneCall = () => {
  window.location.href = "tel:+16477461048";
}

const weather1 =((data.currentConditions));

const t = (weather1)
console.log(data)

//gets the profile information of user (first name and last name)
let[profile,setProfile]=React.useState([]);

React.useEffect(() => {
  loadApiGetProfiles();
},[]);

const loadApiGetProfiles = () => {
  callApiGetProfiles()
    .then(res => {
      setProfile(res.obj);
      console.log(profile);
    })
}
const callApiGetProfiles = async() => {
  const url = serverURL + "/api/getProfiles";
  console.log(url);

  let info = {
    "username": store.getState().user.userNameGlobal
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info)
  });
  const body = await response.json();
  console.log("received: ", body);
  if (response.status !== 200) throw Error(body.message);
  console.log(response);
  return body;
}

//returns the profile avatar with first and last initials 
function LetterAvatars({profile}) {
  return (
    <div>
      {profile.map(data => (
        <div key={data.userID}>
          <Avatar style={{fontFamily: 'Oswald', backgroundColor: '#EBD6C1', color: '#B08968', width: '3.5vh', height: '3.5vh', fontSize: '2vh', marginRight: '2vh'}}>{data.firstName.charAt(0).toUpperCase()}{data.lastName.charAt(0).toUpperCase()}</Avatar>
        </div>
      ))}
    </div>
  );
}

  return (

    <Grid> 
        
        <NavbarTop></NavbarTop>

      <Grid  style={{backgroundColor: '#6D8654', height: '100%', padding: '10vh', color: 'white', display: 'flex', 
      flexDirection: 'column', flexBasis: '100%', flex: 1}}> 
      <Grid >
      
      <h1 align="center" style={{justifyContent: 'center', alignContent: 'center', fontFamily: 'Oswald', 
      letterSpacing: '0.05rem', fontSize:  '5vh', marginTop: '-1vh'}}>Welcome {profile.length > 0 ? profile[0].firstName : ''} {profile.length > 0 ? profile[0].lastName : ''}! </h1>

      </Grid>
      
      <Grid style={{display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: 1, rowGap: '1vh', justifyContent:'center'}}> 
    
      <Grid style={{borderRadius: '5px', backgroundColor: 'white', padding: '2vh', color: '#29241C', marginRight:'2vh'}}> 
        <h1 style={{justifyContent: 'center', alignContent: 'center', fontFamily: 'Oswald', fontSize:  '3vh', marginBottom: '5vh', marginTop: '-1vh', color: '#29241C'}}>Quick Links</h1>
          <Button variant="contained" style={buttonStyle} onClick= {runButton}>
                SHARE BARK
         </Button>
         <p ></p>
         <Button type='submit' style={buttonStyle} variant="contained" onClick={handleClickOpen}>Emergency Contacts</Button>
         <p></p>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Emergency Contacts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What would you like to do?
          </DialogContentText>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={emergencyContactsOption}
            label="Emergency Contact"
            autoWidth
            onChange={handleChangeEmergencyOptions}
            style={{width: "30vh"}}
          >
            <MenuItem style={{width: '30vh'}} value={"View emergency contacts"}> View emergency contacts </MenuItem>
            <br></br>
            <MenuItem style={{width: '30vh'}} value={"Add emergency contacts"}> Add emergency contacts </MenuItem>
          </Select>
          {showTextField && (
            <AddEmergencyContactForm/>
          )}
          {showEmergencyContact && 
            emergencyContacts.map(data => {
              return (
                <div key={data.entryID}>
                  <li>Name: {data.contactName}</li>
                  <li>Phone Number: {data.contactPhoneNumber}</li>
                  <br/>
                </div>
              );
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <p></p>
      <Button type='submit' style={buttonStyle} variant="contained" onClick = {handleClickOpenPhoneCall} >Fake Phone Call</Button>
      <Dialog open={openFakeCall} onClose={handleClosePhoneCall}>
        <DialogTitle>Fake Phone Call</DialogTitle>
        <DialogContent>
            <Button type='submit' variant="contained" onClick = {playPhoneCall} >Play Audio</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePhoneCall}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <p></p>
      <div>
      <Button type='submit' style={buttonStyle} variant="contained" onClick={handlePhoneCall}>Dial 911</Button>
      <p></p>
      <Button onClick={handleSendFriendsEmail} type='submit' style={buttonStyle} variant="contained" >Reached Safety</Button>
      <p></p>
      <img style={{height: '30vh', marginTop: '-15vh'}} src={Dog2} alt="Dog" />
        </Grid>
        <Grid style={{ color: '#29241C',  fontFamily: 'Oswald', fontSize:  '3vh', display: 'flex', flexDirection: 'column', columnGap: '3vh', justifyContent:'center', alignItems: 'center' }}> 
        <Grid style={{borderRadius: '5px', backgroundColor: 'white', padding: '2vh', color: '#29241C',  marginRight:'2vh', height: '100%'}}> 
        <h1 style={{justifyContent: 'center', alignContent: 'center', fontFamily: 'Oswald', fontSize:  '3vh', marginTop: '-1vh', color: '#29241C'}}>Your Alerts</h1>
        <List >
    {alertData.map((item) => (
      <List>
      <ListItem alignItems="center" style={{borderRadius: '5px', fontFamily: 'Noto Sans Lepcha', backgroundColor: '#29241C', color: 'white', width: '45vh'}}>
        {/* <ListItemAvatar > */}
          <LetterAvatars profile={profile}></LetterAvatars>
          {/* <Avatar style={{fontFamily: 'Noto Sans Lepcha', backgroundColor: '#EBD6C1', color: '#B08968'}}>{firstLetter}{lastLetter}</Avatar> */}
        {/* </ListItemAvatar> */}
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
      <TwitterTimelineEmbed
  sourceType="profile"
  screenName="WRPSToday"
  options={{height: 300}}
/>
      </Grid>
      </Grid>

      <Grid style={{ color: '#29241C',  fontFamily: 'Oswald', fontSize:  '3vh', display: 'flex', flexDirection: 'column', columnGap: '3vh', justifyContent:'center' }}> 
        <Grid align="center" style={{borderRadius: '5px', backgroundColor: 'white', padding: '2vh', alignItems: 'center', justifyContent: 'center', marginBottom: '3vh'}}>
          {weather1 != undefined ? JSON.stringify(weather1.temp)+'°C': 'Loading..'} 
          <p style={{fontFamily:'Noto Sans Lepcha', fontSize: '1vh'}}>Temperature</p>
        </Grid>
        <Grid align="center" style={{borderRadius: '5px', backgroundColor: 'white', padding: '1vh', alignItems: 'center', justifyContent: 'center', marginBottom: '3vh',}}> 
          {weather1 != undefined ? JSON.stringify(weather1.feelslike)+'°C': 'Loading..'} <p style={{fontFamily:'Noto Sans Lepcha', fontSize: '1vh'}}>Feels Like Temperature</p>
        </Grid>
        <Grid align="center" style={{borderRadius: '5px', backgroundColor: 'white', padding: '2vh', alignItems: 'center', justifyContent: 'center',  marginBottom: '3vh'}}>
          {weather1 != undefined ? (JSON.stringify(weather1.conditions)).replace(/['"]+/g, ''): 'Loading..'} 
          <p style={{fontFamily:'Noto Sans Lepcha', fontSize: '1vh'}}>Weather Conditions</p>
        </Grid>
        <Grid align="center" style={{borderRadius: '5px', backgroundColor: 'white', padding: '2vh', alignItems: 'center', justifyContent: 'center',  marginBottom: '3vh'}}>
          {weather1 != undefined ? (JSON.stringify(weather1.sunrise)).replace(/['"]+/g, ''): 'Loading..'} <p style={{fontFamily:'Noto Sans Lepcha', fontSize: '1vh'}}>Sunrise</p>
        </Grid>
        <Grid align="center" style={{borderRadius: '5px', backgroundColor: 'white', padding: '2vh', alignItems: 'center', justifyContent: 'center',  marginBottom: '0vh'}}>
          {weather1 != undefined ? (JSON.stringify(weather1.sunset)).replace(/['"]+/g, ''): 'Loading..'}<p style={{fontFamily:'Noto Sans Lepcha', fontSize: '1vh'}}>Sunset</p>
        </Grid>
        
      </Grid>

        </Grid>
        </Grid>
      <Navbar></Navbar>
      
    </Grid>     
  )
};

Home.propTypes = {
classes: PropTypes.object.isRequired
};

export default Home;