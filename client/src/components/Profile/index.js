import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Avatar, Link } from '@material-ui/core'
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import '../Home/index.css'
import Paper from "@material-ui/core/Paper";
import store from '../../store';

const serverURL = "";
const cardStyle={borderRadius: '5px', padding :'5vh', fontFamily: 'Noto Sans Lepcha', color: '#29241C', backgroundColor: 'white', display: 'flex', flex:1, flexDirection: 'row', width: '90vh', height: '35vh', margin: '0 auto'}

//renders avatars with first and last initials 
function LetterAvatars({profile}) {
    return (
      <div>
        {profile.map(data => (
          <div key={data.userID}>
            <Avatar style={{fontFamily: 'Oswald', backgroundColor: '#EBD6C1', color: '#B08968', width: '25vh', height: '25vh', fontSize: '15vh'}}>{data.firstName.charAt(0).toUpperCase()}{data.lastName.charAt(0).toUpperCase()}</Avatar>
          </div>
        ))}
      </div>
    );
  }

  //returns users name, username and email
  function ProfileCont({profile}) {
    return (
      <Grid style={{color: '#29241C', marginLeft: '0vh'}}>
        {profile.map(data => (
          <div key={data.userID}>
            <h2 style={{fontWeight: 'bold'}}>{data.firstName} {data.lastName}</h2>
            <h3 style={{marginBottom: '0vh', marginTop: '0vh'}}>username: {data.userName}</h3>
            <h3 style={{marginBottom: '0vh', marginTop: '0vh'}}>email: {data.email}</h3>
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
  
  //Api call to get profile information for user
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

  //returns card with avatar and user information 
    return (
        <div style={{backgroundColor: '#6D8654', height: '100vh', fontFamily: 'Noto Sans Lepcha'}}> 
          <NavbarTop></NavbarTop>
          <Grid>
            <h1 style={{color: 'white', textAlign: 'center', fontFamily: 'Oswald', paddingTop: '10vh'}}>YOUR PROFILE</h1>
          </Grid>
          <Paper
            style={cardStyle}
          >
            <Grid> 
              <LetterAvatars profile={profile}/>
            </Grid>

            <Grid style={{paddingLeft: '4vh', paddingTop: '2vh', paddingRight: '4vh'}}> 
              <ProfileCont profile={profile}/>
              <Typography variant="h7" component="div" sx={{ flexGrow: 1 }} >
                <Link href="/" style={{letterSpacing: '0.05rem', color: '#B08968', marginTop: '0vh', fontWeight: 'bold' }}>
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
