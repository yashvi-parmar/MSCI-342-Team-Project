import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Avatar, Link } from '@material-ui/core'
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import '../Home/index.css'
import Paper from "@material-ui/core/Paper";
import { useSelector } from 'react-redux';
import store from '../../store';

const serverURL = "";
const cardStyle={padding :'2vh', fontFamily: 'Noto Sans Lepcha', color: '#29241C', backgroundColor: 'white', display: 'flex', flex:1, flexDirection: 'row', width: '80vh', margin: '0 auto'}

function LetterAvatars({profile}) {
    return (
      <div>
        {profile.map(data => (
          <div key={data.userID}>
            <Avatar style={{fontFamily: 'Oswald', backgroundColor: '#EBD6C1', color: '#B08968', width: '30vh', height: '30vh', fontSize: '15vh'}}>{data.firstName.charAt(0).toUpperCase()}{data.lastName.charAt(0).toUpperCase()}</Avatar>
          </div>
        ))}
      </div>
    );
  }

  function ProfileCont({profile}) {
    return (
      <Grid style={{color: '#29241C', marginLeft: '0vh', marginTop: '15vh'}}>
        {profile.map(data => (
          <div key={data.userID}>
            <h3>Name: {data.firstName} {data.lastName}</h3>
            <h3>Username: {data.userName}</h3>
            <h3>Email: {data.email}</h3>
            <br/>
          </div>
        ))}
      </Grid>
    );
  }

function Profile() {

  let[profile,setProfile]=React.useState([]);

  React.useEffect(() => {
    loadApiGetProfiles();
  },[]);
  
  
  
  const loadApiGetProfiles = () => {
    callApiGetProfiles()
      .then(res => {
        setProfile(res.obj);
        console.log(profile);
      })
  }
  
  const callApiGetProfiles = async() => {
    const url = serverURL + "/api/getProfiles";
    console.log(url);
  
    let info = {
      "username": store.getState().user.userNameGlobal
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
        <div style={{backgroundColor: '#6D8654', height: '100vh'}}> 
          <NavbarTop></NavbarTop>
          <Grid>
            <h1 style={{justifyContent: 'center', alignContent: 'center', fontFamily: 'Oswald', fontSize: '3vh', marginBottom: '5vh', marginTop: '20vh'}}>YOUR PROFILE</h1>
          </Grid>
          <Paper
            style={cardStyle}
          >
            <Grid> 
              <LetterAvatars profile={profile}/>
              <Link href="/SignIn" style={{color: '#29241C'}}>
                LOGOUT
              </Link>
            </Grid>
            <Grid style={{marginLeft: '5vh'}}> 
            <ProfileCont profile={profile}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
          <Link href="/" style={{color: 'white'}}>
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
