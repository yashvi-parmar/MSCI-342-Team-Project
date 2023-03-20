import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Avatar, Link } from '@material-ui/core'
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';


//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";


function Avatars() {
    return (
      <div>
        <Avatar style={{backgroundColor: '#EBD6C1', color: '#B08968', width: '35vh', height: '35vh', fontSize: '20vh', left: '40vh', top: '10vh', display: 'flex', justifyContent: 'center'}}>VP</Avatar>
      </div>
    );
}

function ProfileCont() {
  return(
    <Grid style={{color: 'white', marginLeft: '0vh', marginTop: '15vh'}}>
      <h3>Name: Vedangi Patel</h3> 
      <h3>Username: _ve_</h3> 
      <h3>Email: vedangipatel@gmail.com</h3> 
      <h3>Phone Number: 0123456789</h3> 
      <h3>Current Location: insert current location</h3> 
    </Grid>
  )
}

const Friends = () => {

  const[friends, setFriends] = React.useState([""]);

  React.useEffect(() => {
    loadFriends(); 
  }, []);

  const loadFriends = () => {
    callApiLoadFriends()
      .then(res => {
        console.log("callApiLoadFriends returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiLoadFriends parsed: ", parsed);
        setFriends(parsed);
        console.log(parsed);
      })
  }

  const callApiLoadFriends = async () => {
    const url = serverURL + "/api/loadFriends";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  return(
    <Grid style={{color: 'white', marginLeft: '10vh', marginTop: '10vh'}}>
      <h3 justifyContent='center'>Your Friends</h3>
      {friends}
    </Grid>
  )
}


function Profile() {
    return (
        <div> 
          
          <BarkButton></BarkButton>
          <NavbarTop></NavbarTop>
          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{backgroundColor: '#6F4E37', padding: '4vh'}}
          >
            <h3 style={{color:'white'}}>Your profile</h3>
            
            <LetterAvatars/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
          <Link href="/SignIn" style={{color: 'black'}}>
                       Logout
                </Link>
          </Typography>
          </Grid>
          <Navbar></Navbar>
        </div>     
      )
}

export default Profile;
