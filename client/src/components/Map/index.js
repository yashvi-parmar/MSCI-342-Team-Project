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
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import history from '../Navigation/history';

import {GoogleMap, useLoadScript, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Autocomplete } from '@react-google-maps/api';
const textStyle={marginBottom: '8px'}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const cardStyle={padding :30, height:'60vh',width:280, marginTop: "30px", margin:"20px auto"}
const containerStyle = {
  width: '100%',
  height: '800px'
};

const apiKey = "";

function Map() {

  return <MapFxn/>;

/* import {GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Navbar from '../NavBar';

function Map() {

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: "",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapFxn />; */

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

  return (

    <Grid>
      <Grid align='center'>
        <h2>Map</h2>
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
        <Marker position={{lat: lat, lng: lng}}></Marker>
        {directions !== null && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript> 
    </Grid>

/*
    <grid>
        <Navbar></Navbar>
  <GoogleMap 
    zoom={10} 
    center={{lat: 44, lng: -80}} 
    mapContainerClassName="map-container"
  >
    <Marker position={{lat: lat, lng: lng}}></Marker>
  </GoogleMap>
  </grid> */

  );
}
