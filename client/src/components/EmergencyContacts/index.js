import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {TextField, Button } from '@material-ui/core'
import { BrowserRouter,Switch,Route} from 'react-router-dom';

const cardStyle={padding :30, height:'60vh',width:380, marginTop: "30px", margin:"20px auto"}
const buttonStyle={margin:'8px 0', backgroundColor: 'black', color: 'white'}
const textStyle={marginBottom: '8px'}
const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3046";
function EmergencyContacts() {
  return (
    <grid>
      <Navbar></Navbar>
    <div className="EmergencyContacts">
       <Grid>
            <Paper elevation={10} style={cardStyle}>
                <Grid align='center'>
                
                    <h2>Emergency Contacts</h2>
                    <p>List Contacts</p>
                    <p>Add New Contact</p>
                    <TextField style={textStyle} label='Name' placeholder='Enter name' variant="outlined" fullWidth required/>
                    <TextField style={textStyle} label='Phone Number' placeholder='Enter phone number' variant="outlined" fullWidth required/>
                    
                    <Button type='submit' variant="contained" style={buttonStyle} fullWidth>Submit</Button>
             
                
                
                </Grid>
              
            </Paper>
        </Grid>
    </div>
    </grid>
  );
}

export default EmergencyContacts;