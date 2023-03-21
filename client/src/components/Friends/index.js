import React from 'react';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import { Card, CardContent, Typography} from '@material-ui/core';
import {Avatar, Link } from '@material-ui/core'


const ShowFriends = () => {
  const friends = ['Vedangi', 'Yashvi', 'Anna', 'Bhairavi']
  const firstLetters = friends.map((fri) => fri[0]);

  return (
    <Grid container spacing={2} direction="column">
      {friends.map((fri, index) => (
        <Grid item xs={12} sm={6} item key={fri}>
          <Card >
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{backgroundColor: '#EBD6C1', color: '#B08968', width: '10vh', height: '10vh', fontSize: '5vh', marginRight: '5vh'}}>{firstLetters[index]}</Avatar> 
            <div>
              <h3> {fri} </h3>
              <h4> insert location here</h4>
            </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}


function Friends() {
    return (
        <Grid style={{backgroundColor: '#94B395', height: '100%'}}> 
          <NavbarTop></NavbarTop>
          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{padding: '4vh', color: 'black'}}
          >
            <h1 style={{color: '#6F4E37'}}>FRIENDS</h1>
            <ShowFriends/>
          </Grid>
          <Navbar></Navbar>
        </Grid>     
      )
}

export default Friends;