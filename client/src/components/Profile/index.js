import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Avatar, Link } from '@material-ui/core'
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import '../Home/index.css'
import Paper from "@material-ui/core/Paper";
const serverURL = "";
const cardStyle={padding :'2vh', height: '100%', fontFamily: 'Noto Sans Lepcha', color: '#29241C', backgroundColor: '#6D8654', display: 'flex', flex:1, flexDirection: 'row'}
function LetterAvatars() {
  const first = 'Vedangi';
  const last = 'Patel'
    return (
      <div>
        <Avatar style={{fontFamily: 'Oswald', backgroundColor: '#EBD6C1', color: '#B08968', width: '35vh', height: '35vh', fontSize: '20vh'}}>{first[0]}{last[0]}</Avatar>
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

function Profile() {

  let[profile,setProfile]=React.useState({});

  React.useEffect(() => {
    loadApiGetProfiles();
  },[]);
  
  
  
  const loadApiGetProfiles = () => {
    callApiGetProfiles()
      .then(res => {
        //console.log("callApiGetProfiles: ", res.string);
        var parsed = JSON.parse(res.string);
        console.log("callApiGetProfiles: ", parsed[0]);
        setProfile(parsed[0]);
        console.log("profile" + profile.firstName);
        console.log("userID:" + profile.userID)
      })
  }
  
  const callApiGetProfiles = async() => {
    const url = serverURL + "/api/getProfiles";
    console.log(url);
  
    let info = {
      "userID": 1
    };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info)
    });
    const body = await response.json();
    console.log("received: ", body);
    if (response.status !== 200) throw Error(body.message);
    console.log(response);
    return body;
  }
    return (
        <div> 
          <BarkButton></BarkButton>
          <NavbarTop></NavbarTop>
          <Paper
            style={cardStyle}
          >
            <Grid> 
            <h1 style={{color:'white', fontFamily: 'Oswald', marginTop: '5vh'}}>YOUR PROFILE</h1>
            
            <LetterAvatars />
            </Grid>
            <Grid style={{marginLeft: '5vh'}}> 
            <ProfileCont></ProfileCont>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
          <Link href="/SignIn" style={{color: 'white'}}>
                      LOGOUT
                </Link>
          </Typography>
          </Grid>
          </Paper>
          <Navbar></Navbar>
        </div>     
      )
}

export default Profile;
