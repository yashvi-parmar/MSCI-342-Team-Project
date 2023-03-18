import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';
import {  Link } from "react-router-dom";
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
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >
          <Link to="/">
           <p >BARK</p>
           </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                
                color="inherit"
              >
                    <Link to="/">
          
                <AccountCircle />
              
           </Link>
              </IconButton>
              
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}