import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Button} from '@material-ui/core'
import Navbar from '../NavBar';
import { Box } from '@material-ui/core';

const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";

const fetch = require("node-fetch");
const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}
const opacityValue = 0.95;

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
    marginTop: "5vh",
    marginLeft: theme.spacing(5),
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

//--------------------------------------------
const Share = () => {
    
    const runButton = event => {
        event.preventDefault();
        var copyText = "this is the link";
        navigator.clipboard.writeText(copyText).then(() => {
        alert("Link copied to clipboard!");
    });
    }

return (
    <Grid style={{backgroundColor: '#EBD6C1', height: '100vh'}}>
        <h3>Share BARK with a friend</h3>
        <Grid>
            <div>
              <Button variant="contained" color="secondary" onClick= {runButton}>
                SHARE
              </Button>
            </div>
          </Grid>
    </Grid>

)
}

//--------------------------------------------
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  render() {
    const { classes } = this.props;

    const mainMessage = (
      <Grid>
          <Navbar></Navbar>
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                Bye!
              </React.Fragment>
            )}
          </Typography>

        </Grid>
        <Share/>
      </Grid>
      </Grid>
    )

    return (
     
      <MuiThemeProvider theme={theme}>
        <Box
       sx={{
         height: '100vh',
         opacity: opacityValue,
         overflow: "hidden",
         backgroundColor: theme.palette.background.default,
 
       }}
     >
        <div className={classes.root}>
          <CssBaseline />
          <Paper
            className={classes.paper}
          >
            {mainMessage}
          </Paper>

        </div>
        </Box>
      </MuiThemeProvider>
      
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

//---------------------------------------------------------------

// const rootElement = document.getElementById("root")
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   rootElement
// );