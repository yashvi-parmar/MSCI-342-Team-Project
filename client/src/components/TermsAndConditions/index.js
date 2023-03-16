import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import {Avatar, TextField, Button, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SignIn from '../SignIn'
import { BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from '../NavBar';
const opacityValue = 10;

const theme = createTheme({
    palette: {
      type: 'light',
      background: {
        default: "#042913"
      },
      primary: {
        main: "#b08968",
      },
      secondary: {
        main: "#94b395",
      },
    },
  });
  
  const styles = theme => ({
    root: {
      body: {
        backgroundColor: "#000000",
        opacity: opacityValue,
        overflow: "hidden",
      },
    },
    mainMessage: {
      opacity: opacityValue,
    },
  
    mainMessageContainer: {
      marginTop: "10vh",
      marginLeft: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
        marginLeft: theme.spacing(4),
      },
    },
    paper: {
      overflow: "hidden",
    },
    message: {
      opacity: opacityValue,
      maxWidth: 250,
      paddingBottom: theme.spacing(2),
    },
  
  });

function Profile() {
    return (
        <div> 
          <Navbar></Navbar>

          <Grid
            container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{backgroundColor: '#6F4E37', padding: '4vh'}}
          >
            <h1 style={{color: 'white'}}>Terms and Conditions</h1>
            <h4 style={{color: 'white'}}>Welcome to Bark, the women's safety app that helps you reach your destination safely. Our app is designed to promote safety and security for everyone, and we expect our users to adhere to our core values of respect, safety, and community. By using Bark, you agree to the following terms and conditions:
            </h4>
            <h4 style={{color: 'white'}}>1. Safety is our top priority: The safety of our users is our top priority. We encourage you to use Bark to navigate to your destination safely and to report any hazards you encounter along the way. However, we do not guarantee the safety of any user and we cannot be held liable for any harm that may result from using our app.
            </h4>
            <h4 style={{color: 'white'}}>2. Use of the app: You must be 18 years or older to use Bark. By using the app, you agree to provide accurate and complete information about yourself and to maintain the confidentiality of your account. You are solely responsible for your use of the app and any actions you take while using it.
            </h4>
            <h4 style={{color: 'white'}}>3. Reporting hazards: If you notice a hazard along your route, you may report it using the app. We expect all reports to be truthful and accurate, and we do not tolerate spam or hateful language. By reporting a hazard, you agree to indemnify and hold us harmless from any claims arising from the report.
            </h4>
            <h4 style={{color: 'white'}}>4. Alarm button: If you feel unsafe, you may use the alarm button to play a sound. We do not guarantee that this will deter any potential threats, but we hope it will help you feel more secure.
            </h4>
            <h4 style={{color: 'white'}}>5. Adding friends: You may add your friends to the app to see their location and to share your location with them. By adding friends, you agree to obtain their consent to share their location with you and to abide by their privacy settings.
            </h4>
            <h4 style={{color: 'white'}}>6. Termination: We reserve the right to terminate your account if we believe you have violated these terms and conditions or any applicable laws or regulations. We may also terminate the app or any of its features at any time and without notice.
            </h4>
            <h4 style={{color: 'white'}}>7. Disclaimer: The app and its contents are provided "as is" and we make no warranties or representations, express or implied, about the app or its content. We do not guarantee the accuracy, completeness, or timeliness of any information provided by the app.
            </h4>
            <h4 style={{color: 'white'}}>8. Limitation of liability: In no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the app, even if we have been advised of the possibility of such damages.
            </h4>
            <h4 style={{color: 'white'}}>Changes to these terms and conditions: We reserve the right to modify these terms and conditions at any time and without notice. Your continued use of the app following any changes to these terms and conditions constitutes your acceptance of those changes.
            </h4>
            <h4 style={{color: 'white'}}>Thank you for using Bark. We hope that our app will help you feel safer and more secure as you navigate your daily life.</h4>

          </Grid>
        </div>     
      )
}

export default Profile;