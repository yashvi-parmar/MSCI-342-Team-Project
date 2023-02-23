
import React, { Component, useState } from 'react';
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
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import history from '../Navigation/history';
import {GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function Map() {

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAzHpnG-E2GxcumeuQd0npcXaqrD4SRWKc",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapFxn />;
}
export default Map;



function MapFxn() {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  });

  return (
  <GoogleMap 
    zoom={10} 
    center={{lat: 44, lng: -80}} 
    mapContainerClassName="map-container"
  >
    <Marker position={{lat: lat, lng: lng}}></Marker>
  </GoogleMap>
  );
}
