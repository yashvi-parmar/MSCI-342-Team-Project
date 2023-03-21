import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import Share from '../Share';

//Dev mode
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046"; //enable for dev mode
//Deployment mode instructions
// const serverURL = "http://ov-research-4.uwaterloo.ca:3013"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const Home = () => {
  return (
    <div style={{backgroundColor: '#6D8654', color: 'white', height:'100vh'}}> 
      <NavbarTop></NavbarTop>
      <Grid style={{textAlign: 'center', backgroundColor: '#6D8654', color: 'white'}}>
        <h1 style={{margin: '1vh'}}>BARK</h1>
        <h5 >For many, walking home after nightfall can be a scary experience.
           Bark is an app created to be a system to help users safer and more protected when walking home alone at night. 
           We aim to empower people to navigate the city of Waterloo with confidence by knowing that the routes they are 
           taking to get to their destination are the safest ones available. 
          Our system will be geared towards communities and peoples that may feel unsafe walking alone.</h5>
        <p>Blurb about features, with carousel </p>

        <Share></Share>
      </Grid>
      <Navbar></Navbar>
    </div>     
  )
};

Home.propTypes = {
classes: PropTypes.object.isRequired
};

export default Home;