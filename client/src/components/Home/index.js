import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';

//Dev mode
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046"; //enable for dev mode
//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const Home = () => {
  return (
    <div> 
      <NavbarTop></NavbarTop>
      <BarkButton></BarkButton>
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{minHeight: '100%' , backgroundColor: '#6F4E37'}}
      >
        <div style={{marginLeft:'45%'}}>
          <br></br>
          <h1 style={{color: 'white'}}>Welcome!</h1>
        </div>

        <div style={{marginLeft:'20%', marginRight:'20%'}}>
          <h2 align='justify' style={{color: 'white'}}>For many, walking home after nightfall can be a scary experience. Bark is an app created to be a system to help users safer and more protected when walking home alone at night. We aim to empower people to navigate the city of Waterloo with confidence by knowing that the routes they are taking to get to their destination are the safest ones available. Our system will be geared towards communities and peoples that may feel unsafe walking alone.</h2>
          <br></br>
        </div>

        <BarkButton/>

      </Grid>
      <Navbar></Navbar>
    </div>     
  )
};

Home.propTypes = {
classes: PropTypes.object.isRequired
};

export default Home;