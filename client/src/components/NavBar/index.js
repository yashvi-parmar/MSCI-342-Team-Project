// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   CssBaseline,
//   Typography,
//   makeStyles,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import IconButton from '@material-ui/core/IconButton';
// import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3060";
// const theme = createTheme({
//   palette: {
//     type: 'light',
//     background: {
//       default: "#EBD6C1"
//     },
//     primary: {
//       main: "#EBD6C1",
//     },
//     secondary: {
//       main: "#EBD6C1",
//     },
//   },
// });
// const useStyles = makeStyles((theme) => ({
//   navlinks: {
//     marginLeft: theme.spacing(10),
//     display: "flex",
//   },
//  logo: {
//     flexGrow: "1",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     color: "#042913",
//     fontSize: "15px",
//     marginLeft: theme.spacing(10),
//     "&:hover": {
//       color: "#042913",
//       borderBottom: "1px solid #042913",
//     },
//   },
// }));

// function Navbar() {
//   const classes = useStyles();

//   return (
//     <AppBar position="static" style={{ backgroundColor: '#94B395' }}>
//       <CssBaseline />
//       <Toolbar>

//       <IconButton
//           color="inherit"
//           backgroundColor= '#EBD6C1'
//           aria-label="open drawer"
//           edge="start"
//           sx={{ mr: 2, display: { sm: 'none' } }}
//         >
//         </IconButton>

//         <Typography variant="h3" className={classes.logo} style={{color: '#042913'}}>
//           Bark
//         </Typography>
//           <div className={classes.navlinks}>
//             <Link to="/" className={classes.link}>
//               Home
//             </Link>
//             <Link to="/Map" className={classes.link}>
//               Map
//             </Link>
//             <Link to="/Alerts" className={classes.link}>
//               Alerts
//             </Link>

//             <Link to="/Emergency" className={classes.link}>
//               Emergency
//             </Link>
//             <Link to="/Profile" className={classes.link}>
//               Profile
//             </Link>
//             <Link to="/Friends" className={classes.link}>
//               Friends
//             </Link>
//             <Link to="/EmergencyServices" className={classes.link}>
//               Emergency Services
//             </Link>
//             <Link to="/TermsAndConditions" className={classes.link}>
//               Terms and Conditions
//             </Link>
//             <Link to="/LogIn" className={classes.link}>
//               Log In
//             </Link>
//           </div>
//       </Toolbar>
//     </AppBar>
//   );
// }
// export default Navbar;


import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 20),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor: '#94B395'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            backgroundColor= '#94B395'
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color='white'>
            Bark
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#94B395",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/Map" onClick={handleDrawerClose}>
            <ListItemText primary="Map" />
          </ListItem>
          <ListItem button component={Link} to="/Alerts" onClick={handleDrawerClose}>
            <ListItemText primary="Alerts" />
          </ListItem>
          <ListItem button component={Link} to="/Emergency" onClick={handleDrawerClose}>
            <ListItemText primary="Emergency" />
          </ListItem>
          <ListItem button component={Link} to="/Profile" onClick={handleDrawerClose}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/Friends" onClick={handleDrawerClose}>
            <ListItemText primary="Friends" />
          </ListItem>

          <Divider/>
          
          <ListItem button component={Link} to="/EmergencyServices" onClick={handleDrawerClose}>
            <ListItemText primary="Emergency Services" />
          </ListItem>
          <ListItem button component={Link} to="/TermsAndConditions" onClick={handleDrawerClose}>
            <ListItemText primary="Terms and Conditions" />
          </ListItem>
          <ListItem button component={Link} to="/LogOut" onClick={handleDrawerClose}>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}