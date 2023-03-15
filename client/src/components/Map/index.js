import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Avatar, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CreateAccount from '../CreateAccount'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { BrowserRouter,Route} from 'react-router-dom';
import history from '../Navigation/history';
import Navbar from '../NavBar';
import Switch from '@mui/material/Switch';
import useMediaQuery from '@mui/material/useMediaQuery';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {GoogleMap, useLoadScript, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TrafficLayer } from '@react-google-maps/api';
import { StreetViewService } from '@react-google-maps/api';
import { StreetViewPanorama } from '@react-google-maps/api';
import { TransitLayer } from '@react-google-maps/api';
import { HeatmapLayer } from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import { InfoBox } from '@react-google-maps/api';
import { InfoWindow } from '@react-google-maps/api';

const textStyle={marginBottom: '8px'}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const cardStyle={padding :30, height:'160vh',width:580, marginTop: "30px", margin:"20px auto"}
const containerStyle = {
  width: '100%',
  height: '500px',
  display: 'flex'
};

const apiKey = "AIzaSyAMqGMEh0eee_qYPGQ1la32w1Y-aKT7LTI";

function Map() {

  return (
    <grid>
      
    <Navbar></Navbar>
    <div className="Map">
      <Grid>
            <Paper style={{padding: '4vh'}}>
                <Grid align='center'>
                </Grid>
                   
                
                     <MapFxn/> 
                    
                     <p></p>  
                    
            </Paper>
        </Grid>
    </div>
    </grid>
    
  ) 

}
export default Map;

function UseSavedDestination() {

  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState('');

  const handleChange = () => {
    setDestination(10);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnsafe = () => {
    setOpen(true);
  };



  return (
    <div >
      <Button variant="outlined" onClick={handleClickOpen}>Use Saved Destination</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select a Saved Destination</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Destination</InputLabel>
              <Select
                native
                value={destination}
                onChange={handleChange}
                fullWidth
                input={<OutlinedInput label="Destination" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Go!</Button>
        </DialogActions>
      </Dialog>

      <div></div>

    </div>
  );
}


function SaveDestination() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
    <Button variant="outlined" onClick={handleClickOpen}>
      Save a Destination
    </Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Set a Destination</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ending address"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 7
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
  
  const onLoadCircle = circle => {
    console.log('Circle onLoad circle: ', circle)
  }
  
  const onUnmount = circle => {
    console.log('Circle onUnmount circle: ', circle)
  }
  

  const center = {
    lat:  lat,
    lng: lng
  };

  
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
  {id: 2, lat: 43.472118, lng:-80.563546, text: "Avoid due flooding"}, 

]

const friends = [
  {id: 1, lat: 43.472120, lng: -80.553550, friendName: "Friend 1"}
]
const [showed, setShowed] = useState(false);
const [showedF, setShowedF] = useState(false);
const label = { inputProps: { 'aria-label': 'Switch' } };

  return (

    <Grid>
      <Grid align='center'>
      </Grid>      
    <LoadScript
      googleMapsApiKey = {apiKey}
      onLoad={handleLoad}
    >
  
    
      <FormControl onSubmit={handleSubmit}>
      <form>
        <FormLabel htmlFor="destination"></FormLabel>
        <TextField
          id="destination"
          type="text"
          placeholder="Destination"
          style={textStyle}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <Button type='submit' variant="contained" style={buttonStyle} fullWidth>Go!</Button>
      </form>
      </FormControl>

      
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: lat, lng: lng}}
        zoom={16}
        
      >
       \

{unsafetext.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options3}
      position={{lat: item.lat, lng: item.lng}}
    >
      <div style={{ display: showed ? "none": "", backgroundColor: 'yellow', opacity: 0.75, padding: 2 }}>
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
      <div style={{ display: showed ? "none": "", backgroundColor: 'white', opacity: 0.75, padding: 2 }}>
        <div style={{ fontSize: 10, fontColor: `#08233B` }}>
         {item.text}
        </div>
      </div>
    </InfoBox>
    ))}


{friends.map(item => (
      <InfoBox
      onLoad={onLoadInfo}
      options={options3}
      position={{lat: item.lat, lng: item.lng}}
    >
      <div style={{ display: showedF ? "none": "", fontColor: '#FFFFFF', backgroundColor: 'lightblue', opacity: 0.9, padding: 2 }}>
        <div style={{ fontSize: 10, fontColor: '#FFFFFF' }}>
         {item.friendName}
        </div>
      </div>
    </InfoBox>
    ))}
      

        <TrafficLayer
      onLoad={onLoad}
    />
   

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
    
        <h5 style={{marginLeft: '0px', marginTop: '10px'}} onClick={()=> setShowed(!showed)}>{showed ? 'Show' : 'Hide' } Marked Locations</h5> 
        <Switch {...label} style ={{marginTop: '0px' }} variant="outlined" onClick={()=> setShowed(!showed)}>{showed ? 'Show' : 'Hide' }</Switch>
        <p></p>
        <h5 style={{marginLeft: '0px', marginTop: '10px'}} onClick={()=> setShowedF(!showedF)}>{showedF ? 'Show' : 'Hide' } Friends</h5>
        <Switch {...label} style ={{marginTop: '0px' }} variant="outlined" onClick={()=> setShowedF(!showedF)}>{showedF ? 'Show' : 'Hide' } Friends</Switch>
        
      </Grid>
      <Grid> 
      <SaveDestination/> 
      <p></p>
      <UseSavedDestination/>
      </Grid>
    </Grid>

  );
}


