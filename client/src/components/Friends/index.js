import React from 'react';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';

function Friends() {
    return (
        <div> 
          <NavbarTop></NavbarTop>
          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{backgroundColor: '#6F4E37', padding: '4vh', color: 'white'}}
          >
            <h3>Your Friends</h3>
          </Grid>
          <Navbar></Navbar>
        </div>     
      )
}

export default Friends;