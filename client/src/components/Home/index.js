import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import Share from '../Share';
import Dog from './dog.png';
import {Button} from '@material-ui/core'

//Dev mode
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046"; //enable for dev mode
//Deployment mode instructions
// const serverURL = "http://ov-research-4.uwaterloo.ca:3013"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";


  

const Home = () => {

  const runButton = event => {
    event.preventDefault();
    var copyText = "this is the link";
    navigator.clipboard.writeText(copyText).then(() => {
    alert("Link copied to clipboard!");
});
}
  
  return (

    <Grid> 
        
        <NavbarTop></NavbarTop>




      <Grid  style={{backgroundColor: '#6D8654', padding: '10vh', color: 'white', height: '90vh', display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: 1 }}> 
    
      <Grid >
      <img src={Dog} alt="Dog" />
      </Grid>
      <Grid style={{marginLeft: '15vh', justifyContent: 'center', alignContent: 'center'}}> 
        <h1>Welcome User, </h1>
        <h5 >For many, walking home after nightfall can be a scary experience.
           Bark is an app created to be a system to help users safer and more protected when walking home alone at night. 
           We aim to empower people to navigate the city of Waterloo with confidence by knowing that the routes they are 
           taking to get to their destination are the safest ones available. 
          Our system will be geared towards communities and peoples that may feel unsafe walking alone.</h5>
          <Button variant="contained" style={{color: '#29241C'}} onClick= {runButton}>
                SHARE BARK
         </Button>
       
        </Grid>
      
     
      <Navbar></Navbar>
      </Grid>
    </Grid>     
  )
};

Home.propTypes = {
classes: PropTypes.object.isRequired
};

export default Home;