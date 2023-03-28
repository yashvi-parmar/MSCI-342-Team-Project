
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapIcon from '@mui/icons-material/Map';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Paper from '@mui/material/Paper';
import '../Home/index.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import dogBark from "../Map/assets/dogBark.wav"
import { useHistory } from 'react-router-dom';


//Bottom navigation 
export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const history = useHistory();
  //Sound for bark 
  const playSound =() => {
    new Audio(dogBark).play();
  }
  //Change to another page
  const handleChange = (event, newValue) => {
      history.push(`/${newValue}`);
      setValue(newValue);
  
    
  };
  
  return (
    <Box ref={ref}>
      <CssBaseline />
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} style={{fontFamily: 'Oswald'}}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleChange}
          sx={{
            backgroundColor: '#29241C',
            ".MuiBottomNavigationAction-root": {color:'#FCFCFC'},
            ".Mui-selected, svg": {
              color: "#EDECED"
            }
         }}
        >
          <BottomNavigationAction  color="white" label="Map"  value="Map" icon={<MapIcon />} />
          <BottomNavigationAction label="Alerts" value="Alerts" icon={<AnnouncementIcon />} />
          <BottomNavigationAction label="Friends" value="Friends" icon={<Diversity1Icon />} />
          <BottomNavigationAction label="Bark Button" value="Home" onClick={playSound}  icon={<VolumeUpIcon />} /> 
         
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

