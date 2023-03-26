import React from 'react';

function Home(){
  const name = 'User';
  return <h1 align="center" style={{justifyContent: 'center', alignContent: 'center', fontFamily: 'Oswald', 
  letterSpacing: '0.05rem', fontSize:  '5vh', marginTop: '-1vh'}}> Welcome {name}! </h1>;
}

export default Home;