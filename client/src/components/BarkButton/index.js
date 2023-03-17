import React, { Component } from 'react';
import {Avatar, TextField, Button, Link } from '@material-ui/core'
import { Box } from '@material-ui/core';
import dogBark from "./assets/dogBark.wav";

function BarkButton (){
    const playSound =() => {
      new Audio(dogBark).play();
    }
  
    return(
      <Box sx={{ '& button': { m: 1 } }}>
        <div>
        <Button type='submit' style={{color: 'white', backgroundColor: '#2E5129', position: 'fixed', bottom: '3vh', right: '3vh', }} variant={"contained"}  onClick={playSound}>Play Bark</Button>
        </div>
      </Box>
    )
  }

  export default BarkButton;