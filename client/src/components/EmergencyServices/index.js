import React from 'react';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import BarkButton from '../BarkButton';

function EmergencyServices() {
    return (
        <div> 
          <Navbar></Navbar>
          <BarkButton></BarkButton>
          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{backgroundColor: '#6F4E37', padding: '4vh'}}
          >
            <h1 style={{color: 'white'}}>Emergency Serivices</h1>
            
            <h3 style={{color: 'white'}}>In the event of an emergency: 9-1-1</h3>
            <h3 style={{color: 'white'}}>Canadian Coast Guard: 1-800-265-0237</h3>

            <h3 style={{color: 'white'}}>Domestic Abuse Hotline: </h3>
            <h3 style={{color: 'white'}}>Idk some other number: </h3>
            <h3 style={{color: 'white'}}>Kids Help Line: 1-800-668-6868</h3>
          </Grid>
        </div>     
      )
}

export default EmergencyServices;

