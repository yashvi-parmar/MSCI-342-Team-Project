import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';
import {  Link } from "react-router-dom";
import BarkLogo from './BarkLogo.jpg';
export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    history.push(`${newValue}`);
    setValue(newValue);
  };
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 , backgroundColor: '#6F4E37'}}>
      
      <AppBar style={{backgroundColor: '#6F4E37', color: 'white'}}position="sticky" >
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
          <Link to="/">
          <img src={BarkLogo} alt="Bark Logo" style={{ width: '50px', marginTop: '5px'}}/>
           </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                
                color="#2E5129"
              >
                    <Link to="/Profile">
          <div style={{color: 'white'}}><AccountCircleIcon /> </div>

              
           </Link>
              </IconButton>
              
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}