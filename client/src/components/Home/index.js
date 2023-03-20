
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import {GoogleMap, LoadScript, Marker, DirectionsRenderer, Autocomplete, TrafficLayer, Circle, InfoBox} from '@react-google-maps/api';
import React, { useEffect, useState } from "react";
//Dev mode
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046"; //enable for dev mode
//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";
const userName = "Test"
const current = new Date();

const date = `${current.getMonth()+1}-${current.getDate()}-${current.getFullYear()}`;


const Home = () => {
  return (
    <div> 
      <NavbarTop></NavbarTop>
    
      <Grid
        container
      
        style={{padding: '4vh' , backgroundColor: '#6F4E37'}}
      >
        <div style={{color: 'white'}}>
          <br></br>
          <h2 >Welcome {userName}!</h2>
          <h4>Today's Date: {date}</h4>
          <h4>Today's Weather: {date}</h4>
        </div>
        
        
        

        <div style={{color: 'white'}}>
          <h4 style={{marginBottom: '-20px'}}>About Bark</h4>
          <h6 align='justify' >For many, walking home after nightfall can be a scary experience. Bark is an app created to be a system to help users safer and more protected when walking home alone at night. We aim to empower people to navigate the city of Waterloo with confidence by knowing that the routes they are taking to get to their destination are the safest ones available. Our system will be geared towards communities and peoples that may feel unsafe walking alone.</h6>
          <br></br>
        </div>

      

      </Grid>
      <Navbar></Navbar>
    </div>     
  )
};

Home.propTypes = {
classes: PropTypes.object.isRequired
};

export default Home;