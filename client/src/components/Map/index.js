
import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TextField, Button} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
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
import dogBark from "./assets/dogBark.wav"
import { DeskOutlined } from '@mui/icons-material';
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}
const containerStyle = {
  width: '100%',
  height: '500px',
  display: 'flex'
};
const serverURL = "";

const apiKey = "AIzaSyAMqGMEh0eee_qYPGQ1la32w1Y-aKT7LTI";

function Map() {

  return (
    <grid style={{backgroundColor: '#E6CCB2'}}>
      <NavbarTop></NavbarTop>
    
    <div className="Map">
      <Grid>
            <Paper style={{backgroundColor: '#6F4E37',padding: '4vh'}}>
                <Grid align='center'>
                </Grid>
                     <MapFxn/> 
            </Paper>
        </Grid>
    </div>
    <Navbar></Navbar>
    
    </grid>
  )
}
export default Map;

function MapFxn() {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const directionsCallback = (response) => {
    if (response !== null) {
      setDirections(response);
    }
  };

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setOrigin(`${position.coords.latitude}, ${position.coords.longitude}`);
      },
    );
  }, []);

  const handleLoad = (map) => {
    const directionsServiceOptions = {
      origin: origin,
      destination: destination,
      travelMode: 'WALKING'
    };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(directionsServiceOptions, directionsCallback);

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (origin !== '' && destination !== '') {
      const directionsServiceOptions = {
        origin: origin,
        destination: destination,
        travelMode: 'WALKING'
      };

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(directionsServiceOptions, directionsCallback);
      
    }

  };

  const onLoad = trafficLayer => {
    console.log('trafficLayer: ', trafficLayer)
  }

  const onLoadInfo = infoBox => {
    console.log('infoBox: ', infoBox)
  };

  const options3 = { closeBoxURL: '', enableEventPropagation: true };

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10,
    zIndex: 1
  }

  const options2 = {
    strokeColor: '#00ff44',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#00ff44',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 15,
    zIndex: 1
  }
  
const unsafelocations = [
      {id: 1, lat: 43.472120, lng:-80.543550},
      {id: 2, lat: 43.472118, lng:-80.563546}
    ];

const safelocations = [
      {id: 1, lat: 43.473130, lng:-80.543550},
      {id: 2, lat: 43.483112, lng:-80.533546}
    ];

const safetext = [
    {id: 1, lat: 43.473130, lng:-80.543550, text: "Center for help"},
    {id: 2, lat: 43.483112, lng:-80.533546, text: "Center for help"}
];

const unsafetext = [
  {id: 1, lat: 43.472120, lng:-80.543550, text: "Avoid due to a broken streetlight"}, 

  {id: 2, lat: 43.472118, lng:-80.563546, text: "Avoid due to flooding"}, 

]

const friends = [
  {id: 1, lat: 43.472120, lng: -80.553550, friendName: "Friend 1"}
]
const [showed, setShowed] = useState(false);
const [showedF, setShowedF] = useState(false);
const [showedT, setShowedT] = useState(false);
const label = { inputProps: { 'aria-label': 'Switch' } };
const playSound =() => {
  new Audio(dogBark).play();
}
const [openUse, setOpenUse] = useState(false);

const [autocomplete, setAutocomplete] = useState(null);

const handlePlaceSelect = (place) => {
      setDestination(place.formatted_address);
};

const handleAutocompleteLoad = (autocomplete) => {
  setAutocomplete(autocomplete);
};

const reloadPage = () => {
    window.location.reload();
};

const handleChange = (event) => {
  setDestinationForm(event.target.value);
};

const submitSaveDestination = () => {
  if (!destination) {
    window.alert("Please Enter a Destination to Save");
  } else {
    loadApiAddSavedDestination();
  }
};

const handleClickOpenUse = () => {
  setOpenUse(true);
};


const handleCloseCancelUse = () => {
  setOpenUse(false);
};

const handleCloseSubmit = () => {
  setOpenUse(false);
  setDestination(destinationForm);
};

const [destinationForm, setDestinationForm] = useState('');

  const [open, setOpen] = React.useState(false);
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

  const emergencyContacts = [
    {name: "Joanna Hayburt", phoneNumber: "647-724-3423"}, 
    {name: "Pam Albert", phoneNumber: "647-711-3111"}, 
  ]

const loadApiAddSavedDestination = () => {
  callApiAddSavedDestination()
    .then((res) => {
      console.log(res.message);
    })
};

const callApiAddSavedDestination = async () => {
  const url = serverURL + "/api/addSavedDestination";
  
  let AddressInfo = {
    "address": destination,
    "user": 1,
  };

  console.log(AddressInfo);
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(AddressInfo)
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

let [savedDestinations, setSavedDestinations] = React.useState([]);
    
React.useEffect(() => {
  getSavedDestinations();
}, []);

const getSavedDestinations = () => {
  callApiGetSavedDestinations()
    .then(res => {
      setSavedDestinations(res.destinationsData);
    })
}

const callApiGetSavedDestinations = async() => {
  const url = serverURL + "/api/getSavedDestinations";
  console.log(url);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

  return (

    <grid>

<Grid >
  <Grid align='center'>
  </Grid>      
<LoadScript
  googleMapsApiKey = {apiKey}
  onLoad={handleLoad}
  libraries={['places']}
>   
  <FormControl onSubmit={handleSubmit}>
  <form>
    <FormLabel htmlFor="destination"></FormLabel>
    <Autocomplete 
      onLoad={handleAutocompleteLoad} 
      onPlaceChanged={() => handlePlaceSelect(autocomplete.getPlace())}
      options={{ componentRestrictions: { country: "ca" } }}
    >
    <TextField
      id="destination"
      type="text"
      placeholder="Destination"
      style={{ width: '400px', backgroundColor: 'white'}}
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
    />
    </Autocomplete>
    <p></p>
    <Button type='submit' variant="contained" style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px', marginBottom: '15px'}}>Go</Button>
    <Button type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px',  marginBottom: '15px'}} variant="contained" onClick={reloadPage} >Reset Map</Button>
  </form>
  </FormControl>
<Grid container >
    <div>
    <Button onClick={submitSaveDestination} type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px', marginBottom: '15px'}} variant="contained">Save This Destination</Button>
    </div>
    <Button onClick={handleClickOpenUse} type='submit' variant="contained" style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px', marginBottom: '15px'}}>Use Saved Destination</Button>
      <Dialog disableEscapeKeyDown open={openUse} onClose={handleCloseCancelUse}>
        <DialogTitle>Use Saved Destination</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }} style={{color: '#E6CCB2'}} >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                native
                value={destinationForm}
                onChange={handleChange}
                fullWidth
                input={<OutlinedInput label="Destination" id="demo-dialog-native" />}
              >
              {savedDestinations.map((savedDestinations) => {
              return (
                <MenuItem key = {savedDestinations.id} value = {savedDestinations.address}>{savedDestinations.address}</MenuItem>
              )
        

            })}
            </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelUse} type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px', marginBottom: '15px'}} variant="contained">Cancel</Button>
          <Button onClick={handleCloseSubmit} type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px', marginBottom: '15px'}} variant="contained">Set Destination</Button>
        </DialogActions>
      </Dialog>  
      </Grid> 
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={{lat: lat, lng: lng}}
    zoom={16}
  >


{unsafetext.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options3}
      position={{lat: item.lat, lng: item.lng}}
    >
      <div style={{ display: showed ? "none": "", backgroundColor: '#E6CCB2', opacity: 1, padding: 2 }}>
        <div style={{ fontSize: 10, fontColor: `#08233B` }}>
         {item.text}
        </div>
      </div>
    </InfoBox>
    ))}

{safetext.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options3}
      position={{lat: item.lat, lng: item.lng}}
    >
      <div style={{ display: showed ? "none": "", backgroundColor: '#2E5129', opacity: 1}}>
        <p style={{ fontSize: 10, color: 'white', padding: 2  }}>
         {item.text}
        </p>
      </div>
    </InfoBox>
    ))}


{friends.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options3}
      position={{lat: item.lat, lng: item.lng}}
    >
      <div style={{ display: showedF ? "none": "", fontColor: '#FFFFFF', backgroundColor: '#6F4E37', opacity: 1 }}>
        <p style={{ fontSize: 10, color: '#FFFFFF', padding: 2 }}>
         {item.friendName}
        </p>
      </div>
    </InfoBox>
    ))}
        {!showedT ? <TrafficLayer onLoad={onLoad} /> : null}
    
   {unsafelocations.map(item => (
      <Circle options={options} center={{lat: item.lat, lng: item.lng}}></Circle>
    ))}

  {safelocations.map(item2 => (
      <Circle options={options2} center={{lat: item2.lat, lng: item2.lng}}></Circle>
    ))}
        <Marker  position={{lat: lat, lng: lng}}></Marker>
        {directions !== null && <DirectionsRenderer directions={directions} provideRouteAlternatives ={true} />}
      </GoogleMap>
      
                
            
      
   
    </LoadScript> 
    <Grid style={{paddingTop: '1vh', display: 'flex'}}> 
    
        <h5 style={{marginLeft: '0px', marginTop: '10px', color: 'white'}} onClick={()=> setShowed(!showed)}>{showed ? 'Show' : 'Hide' } Marked Locations</h5> 
        <Switch {...label} color="success" style ={{marginTop: '0px' }} variant="outlined" onClick={()=> setShowed(!showed)}>{showed ? 'Show' : 'Hide' }</Switch>
        <p></p>
        <h5 style={{marginLeft: '0px', marginTop: '10px', color: 'white'}} onClick={()=> setShowedF(!showedF)}>{showedF ? 'Show' : 'Hide' } Friends</h5>
        <Switch {...label} color="success" style ={{marginTop: '0px' }} variant="outlined" onClick={()=> setShowedF(!showedF)}>{showedF ? 'Show' : 'Hide' } Friends</Switch>
        <p></p>
        <h5 style={{marginLeft: '0px', marginTop: '10px', color: 'white'}} onClick={()=> setShowedT(!showedT)}>{showedT ? 'Show' : 'Hide' } Traffic</h5>
        <Switch {...label} color="success" style ={{marginTop: '0px' }} variant="outlined" onClick={()=> setShowedT(!showedT)}>{showedT ? 'Show' : 'Hide' } Traffic</Switch>
      </Grid>
     
      <p></p>
      <Grid container={2} display='flex'> 
      <Button type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px', marginBottom: '15px'}} variant="contained" onClick={handleClickOpen}>Emergency Contacts</Button>
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
          >
            <MenuItem value={"View emergency contacts"}> View emergency contacts </MenuItem>
            <br></br>
            <MenuItem value={"Add emergency contacts"}> Add emergency contacts </MenuItem>
          </Select>
          {showTextField && (
            <AddEmergencyContactForm/>
          )}
          {showEmergencyContact && 
            emergencyContacts.map(data => {
              return (
                <div key={data.id}>
                  <li>Name: {data.name}</li>
                  <li>Phone Number: {data.phoneNumber}</li>
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
      <Button type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px',  marginBottom: '15px'}} variant="contained" >Fake Phone Call</Button>
      </Grid> 
      <Grid container={2} display='flex'> 
      <Button type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px', marginBottom: '15px'}} variant="contained"  onClick={playSound}>Play Bark</Button>
      <p></p>
      <Button type='submit' style={{color: 'white', backgroundColor: '#2E5129', marginRight: '10px',  marginBottom: '15px'}} variant="contained" >Dial 911</Button>
       </Grid>
    </Grid>
    </grid>

  );

}

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
    }
  };


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
  
                <TextField style={textStyle} label='Phonenumber' placeholder='Enter phone number' variant="outlined" value = {phoneNumber} onChange={handlePhoneNumberInput} fullWidth />
                {
                    phoneNumber === '' && submissionCheck ===true ? (
                    <div><em style={{color:'red'}}>*Please enter your emergency contact's phone number!</em></div>) : (<div></div>)
                  }
                
                <Button type='submit' variant="contained" style={buttonStyle} fullWidth  onClick={handleSubmissionCheck} >ADD EMERGENCY CONTACT</Button>
                </form>
             </FormControl> 
        </Grid>
  );
}


