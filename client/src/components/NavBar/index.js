/*import * as React from 'react';
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
          <Typography variant="h6" noWrap component="div" color='white' marginLeft="5px">
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
        <List style={{ marginLeft: '10px', color: 'white'}}>
          <ListItem  button component={Link} to="/" onClick={handleDrawerClose}>
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
        

          <ListItem button component={Link} to="/SignIn" onClick={handleDrawerClose}>
            <ListItemText primary="Sign In" />
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
*/
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapIcon from '@mui/icons-material/Map';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    history.push(`/${newValue}`);
    setValue(newValue);
  };
  
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange} 
          style={{color: 'white', backgroundColor: '#6F4E37'}}
        >
          <BottomNavigationAction label="Map"  value="Map" icon={<MapIcon />} />
          <BottomNavigationAction label="Alerts" value="Alerts" icon={<AnnouncementIcon />} />
          <BottomNavigationAction label="Friends" value="Friends" icon={<Diversity1Icon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

