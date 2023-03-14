import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

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
const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "15px",
    marginLeft: theme.spacing(10),
    "&:hover": {
      color: "purple",
      borderBottom: "1px solid purple",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>

      <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
        </IconButton>

        <Typography variant="h3" className={classes.logo}>
          Bark
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/Map" className={classes.link}>
              Map
            </Link>
            <Link to="/Alerts" className={classes.link}>
              Alerts
            </Link>

            <Link to="/Emergency" className={classes.link}>
              Emergency
            </Link>
            <Link to="/Profile" className={classes.link}>
              Profile
            </Link>
            <Link to="/Friends" className={classes.link}>
              Friends
            </Link>
            <Link to="/EmergencyServices" className={classes.link}>
              Emergency Services
            </Link>
            <Link to="/TermsAndConditions" className={classes.link}>
              Terms and Conditions
            </Link>
            <Link to="/LogIn" className={classes.link}>
              Log In
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;


// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// export default function PersistentDrawerLeft() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleNavigation = (index) => {
//     if (index === 0){
//       return (
//         <Link to="/" className={classes.link}>
//           Home
//         </Link>
//       )
//     } else {
//       return(
//         <Link to="/Map" className={classes.link}>
//           Map
//         </Link>
//       )
//     }
//   };


//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Bark
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>

//         <div className={classes.navlinks}>
//             <Link to="/" className={classes.link}>
//               Home
//             </Link>
//             <Link to="/Map" className={classes.link}>
//               Map
//             </Link>
//             <Link to="/Dashboard" className={classes.link}>
//               Dashboard
//             </Link>

//             <Link to="/Emergency" className={classes.link}>
//               Emergency
//             </Link>
//             <Link to="/SignIn" className={classes.link}>
//               Sign In
//             </Link>
//             <Link to="/Share" className={classes.link}>
//               Share
//             </Link>
//           </div>
          
//         </List>
//         <Divider />
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//       </Main>
//     </Box>
//   );
// }
