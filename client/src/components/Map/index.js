
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
import { DeskOutlined } from '@mui/icons-material';
import fakePhoneCall from "./assets/fakePhoneCall.wav"
import '../Home/index.css'
import { useSelector } from 'react-redux';
import store from '../../store';

const buttonStyle={margin:'8px 0', backgroundColor: '#29241C',  marginRight: '10px', marginBottom: '15px', color: 'white', fontFamily: 'Oswald', letterSpacing: '0.05rem'} 

const textStyle={marginBottom: '8px'}
const containerStyle = {
  width: '100%',
  height: '60vh',
  display: 'flex'
};

const serverURL = "";



const apiKey = "AIzaSyAMqGMEh0eee_qYPGQ1la32w1Y-aKT7LTI";

function Map() {

  const userNameGlobal = useSelector((state) => state.user.userNameGlobal);

  useEffect(() => {
    console.log('userNameGlobal in MapComponent:', store.getState().user.userNameGlobal);
  }, [userNameGlobal]);


  return (
    <grid style={{backgroundColor: '#6D8654', fontFamily: 'Noto Sans Lepcha'}}>
      <NavbarTop></NavbarTop>
    
    <div className="Map">
      <Grid>
            <Paper style={{backgroundColor: '#6D8654',padding: '4vh',  marginTop: '3vh'}}>
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
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setOrigin(`${position.coords.latitude}, ${position.coords.longitude}`);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleLoad = () => {
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
    //console.log("hello, " + userNameGlobal);
    console.log('trafficLayer: ', trafficLayer)
  }

  const onLoadInfo = infoBox => {
    console.log('infoBox: ', infoBox)
  };

  const onLoadInfoAuth = infoBox => {

  };

  const optionsAuth = { closeBoxURL: '', enableEventPropagation: true };

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
  zIndex: 1,
  closeBoxURL: '', enableEventPropagation: true 
  
}

  const options3 = {
    strokeColor: '#000000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#271f1f',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10,
    zIndex: 1, closeBoxURL: '', enableEventPropagation: true 
  }

  const options4 = {
    strokeColor: '#000000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#ADD8E6',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10,
    zIndex: 1, closeBoxURL: '', enableEventPropagation: true 
  }

  const options2 = {
    strokeColor: '#00ff44',
    strokeOpacity: 0.8,
    closeBoxURL: '', enableEventPropagation: true ,
    strokeWeight: 2,
    fillColor: '#00ff44',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10,
    zIndex: 1
  }


  let [unsafetext,setUnsafeText]=React.useState([]);
  let [safetext,setSafetext] = React.useState([]);
  let [friends,setFriends] = React.useState([]);

  React.useEffect(() => {
    //loadUserSettings();
    loadGetAlerts();
   },[]);

   const loadGetAlerts =() => {
    callGetAlerts()
      .then(res => {
        setUnsafeText(res.alertData);
        console.log(unsafetext);
      });
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

  React.useEffect(() => {
    loadGetSafeLocations();
   },[]);

  const loadGetSafeLocations =() => {
    callGetSafeLocations()
      .then(res => {
        setSafetext(res.safeData);
        console.log(safetext)
  });
  }
  const callGetSafeLocations = async() => {
    
    const url = serverURL + "/api/getSafeLocations";
    console.log(url)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body =await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

 
React.useEffect(() => {
  //loadUserSettings();
  loadGetFriends();
 },[]);

const loadGetFriends =() => {
  callGetFriends()
    .then(res => {
      setFriends(res.friendData);
});
}
const callGetFriends = async() => {
  
  const url = serverURL + "/api/GetFriends";
  let FriendInfo = { 
    "username": store.getState().user.userNameGlobal,
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
  const body =await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}

const [showed, setShowed] = useState(false);
const [showedF, setShowedF] = useState(false);
const [showedT, setShowedT] = useState(false);
const label = { inputProps: { 'aria-label': 'Switch' } };

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
  setShouldRefresh(true);
};


const handleCloseCancelUse = () => {
  setOpenUse(false);
};

const handleCloseSubmit = () => {
  setOpenUse(false);
  setDestination(destinationForm);
};

const [destinationForm, setDestinationForm] = useState('');

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
    "userName":  store.getState().user.userNameGlobal
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
let [shouldRefresh, setShouldRefresh] = React.useState(false);
    
React.useEffect(() => {
  if (shouldRefresh) {
    getSavedDestinations();
    setShouldRefresh(false);
  }
}, [shouldRefresh]);

React.useEffect(() => {
  console.log(savedDestinations);
}, [savedDestinations]);

const getSavedDestinations = () => {
  callApiGetSavedDestinations()
    .then(res => {
      setSavedDestinations(res.destinationsData);
    })
}

const callApiGetSavedDestinations = async() => {
  const url = serverURL + "/api/getSavedDestinations";
  console.log(url);

  let info = {
    "userName": store.getState().user.userNameGlobal
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info)
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  console.log(response);
  return body;
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

let [authPlaces, setAuthPlaces] = React.useState([]);

React.useEffect(() => {
  getAuthLocations();
}, []);

React.useEffect(() => {
}, [authPlaces]);

const getAuthLocations = () => {
  callAPIGetAuthLocations()
    .then(res => {
      setAuthPlaces(res.authData);
    })
}

const callAPIGetAuthLocations = async() => {
  const url = serverURL + "/api/getAuthorities";
  console.log(url);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  console.log(body);
  console.log(response.status);
  setAuthPlaces(body.authData);
  return body;
}

  return (

    <grid style={{height: '100%', backgroundColor: '#6D8654'}}>
<Grid style={{marginTop:'6vh'}} >
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
      style={{ width: '400px', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
      InputProps={{
        style: { borderBottom: '2px solid #29241C' }
      }}
    />
    </Autocomplete>
    <p></p>
    <Button type='submit' id = "Go" variant="contained" style={buttonStyle}>Go</Button>
    <Button type='submit' style={buttonStyle} variant="contained" onClick={reloadPage} >Reset Map</Button>
  </form>
  </FormControl>
<Grid container >
    <div>
    <Button onClick={submitSaveDestination} type='submit' style={buttonStyle} variant="contained">Save This Destination</Button>
    </div>
    <Button onClick={handleClickOpenUse} type='submit' variant="contained" style={buttonStyle}>Use Saved Destination</Button>
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
                <option aria-label="None" value="" />
                {savedDestinations.map(savedDestinations => (
                  <option key={savedDestinations.id} value={savedDestinations.address}>
                  {savedDestinations.address}
               </option>
                ))}
                {savedDestinations.address}
            </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancelUse} type='submit' style={buttonStyle} variant="contained">Cancel</Button>
          <Button onClick={handleCloseSubmit} type='submit' style={buttonStyle} variant="contained">Set Destination</Button>
        </DialogActions>
      </Dialog>  
      </Grid> 
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={{lat: lat, lng: lng}}
    bounds={
      {
        nw: { lat: lat + 0.001, lng: lng - 0.001 },
        se: { lat: lat - 0.001, lng: lng + 0.001 },
      }
    }
    zoom={17}
  >


{unsafetext.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options3}
      position={{lat: item.lat, lng: item.lng}}
    >
      <div style={{ display: showed ? "none": "", backgroundColor: '#EFCA43', opacity: 1, padding: 4 }}>
        <div style={{ fontSize: 10, fontColor: '#29241C', fontFamily: 'Noto Sans Lepcha'}}>
         {item.alert}
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
      <div style={{ display: showed ? "none": "", backgroundColor: '#6D8654', opacity: 1}}>
        <p style={{ fontSize: 10, color: 'white', padding: 4  }}>
         {item.description}
        </p>
      </div>
    </InfoBox>
    ))}

  {authPlaces.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options4}
      position={{lat: item.lat, lng: item.lng}}
    >
      <div style={{ display: showed ? "none": "", backgroundColor: '#87CEFA', opacity: 1}}>
        <p style={{ fontSize: 10, color: 'black', padding: 4  }}>
         {item.location}
        </p>
      </div>
    </InfoBox>
    ))}

{friends.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options3}
      position={{lat: item.latitude, lng: item.longitude}}
    >
      <div style={{ display: showedF ? "none": "", fontColor: '#FFFFFF', backgroundColor: '#29241C', opacity: 0.85 }}>
        <p style={{ fontSize: 10, color: '#FFFFFF', padding: 4 }}>
         {item.FullName}
        </p>
      </div>
    </InfoBox>
    ))}
        {!showedT ? <TrafficLayer onLoad={onLoad} /> : null}
    
   {unsafetext.map(item => (
      <Circle options={options} center={{lat: item.lat, lng: item.lng}}></Circle>
    ))}

  {safetext.map(item2 => (
      <Circle options={options2} center={{lat: item2.lat, lng: item2.lng}}></Circle>
    ))}

{friends.map(item3 => (
      <Circle options={options3} center={{lat: item3.lat, lng: item3.lng}}></Circle>
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
    </Grid>
    </grid>
  );
}