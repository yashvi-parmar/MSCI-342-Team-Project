import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import BarkButton from '../BarkButton';
import Share from '../Share';
import Dog from './dog.png';
import {Button} from '@material-ui/core'
import './index.css'
import List from '@mui/material/List';

//Dev mode
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046"; //enable for dev mode
//Deployment mode instructions
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3034" //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";


const fetch = require("node-fetch");
  

const Home = () => {
  const [userList, setUsersList] = React.useState([]);
  const loadUsers = () => {
    callApiLoadUsers()
      .then(res => {
        console.log("callApiLoadRecipes returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiLoadRecipes parsed: ", parsed);
        setUsersList(parsed);
      })
  }

  const callApiLoadUsers = async () => {
    const url = serverURL + "/api/loadUsers";
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
 
  const buttonStyle={margin:'8px 0', backgroundColor: '#29241C', color: 'white', fontFamily: 'Oswald', letterSpacing: '0.1rem'}
  const runButton = event => {
    loadUsers();
    event.preventDefault();
    var copyText = "this is the link";
    navigator.clipboard.writeText(copyText).then(() => {
    alert("Link copied to clipboard!");
});
}
  
  return (

    <Grid> 
        
        <NavbarTop></NavbarTop>



      <List userList={userList}></List>
      <Grid  style={{backgroundColor: '#6D8654', padding: '10vh', color: 'white', height: '90vh', display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: 1 }}> 
      <Grid >
      <img src={Dog} alt="Dog" />
      </Grid>
    
      <Grid style={{marginLeft: '15vh', justifyContent: 'center', alignContent: 'center'}}> 
        <h1 style={{fontFamily: 'Oswald', letterSpacing: '0.05rem', fontSize:  '5rem'}}>Welcome User, </h1>
        <h5 style={{fontFamily: 'Noto Sans Lepcha', fontSize: '1rem', marginTop: '-5vh'}}>For many, walking home after nightfall can be a scary experience.
           Bark is an app created to be a system to help users safer and more protected when walking home alone at night. 
           We aim to empower people to navigate the city of Waterloo with confidence by knowing that the routes they are 
           taking to get to their destination are the safest ones available. 
          Our system will be geared towards communities and peoples that may feel unsafe walking alone.</h5>
          <Button variant="contained" style={buttonStyle} onClick= {runButton}>
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