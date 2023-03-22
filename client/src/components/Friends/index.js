import React from 'react';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import { Card, CardContent, Typography} from '@material-ui/core';
import {Avatar, Link } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const serverURL = ""; //enable for dev mode
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:PORT";

const ShowFriends = () => {
  //replace with actual api calls
  const firstNames = ['Vedangi', 'Yashvi', 'Anna', 'Bhairavi']; 
  const lastNames = ['Patel', 'Parmar', 'Thalayasingam', 'Fyfe']
  const locations = ['vedangis location', 'yashvis location', 'annas location', 'bhairavis location'];
  const firstLetters = firstNames.map((first) => first[0]);
  const lastLetters = lastNames.map((last) => last[0]);

  return (
    <Grid container spacing={2} direction="column">
      {firstNames.map((fri, index) => (
        <Grid xs={12} sm={12} item key={fri} style={{marginRight: '5vh'}}>
          <Card>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{backgroundColor: '#EBD6C1', color: '#B08968', width: '10vh', height: '10vh', fontSize: '4vh', marginRight: '5vh', marginLeft: '3vh'}}>{firstLetters[index]}{lastLetters[index]}</Avatar> 
            <div>
              <h3>{fri} {lastNames[index]} </h3>
              <h4>{locations[index]}</h4>
            </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

const SearchBar = (props) => {
  //when the search button is clicked enteredUserName becomes the entered value
  const onChange = (event) => {
    props.setEnteredUsername(event.target.value)
  }
  
  //displaying the text box
  return (
    <Grid>
      <TextField id="standard-required" label="Search by Username" variant = "outlined" onChange={onChange} style={{margin: "2vh", width: "60vh"}} error={props.isError}/>
    </Grid>
  )
}

const SearchFriends = () => {

  const [enteredUsername, setEnteredUsername] = React.useState ('');
  const [isEmpty, setIsEmpty] = React.useState (false);
  const [searchResult, setSearchResult] = React.useState ([]);
  const [firstName, setFirstName] = React.useState ('');
  const [lastName, setLastName] = React.useState ('');

  
  const runButton = event => {
    event.preventDefault();

    setIsEmpty (false);

    if (enteredUsername === ''){
        setIsEmpty (true);
    } else {
      // console.log('hello')
      // setFirstName ('Vedangi');
      // setLastName ('Last');
      // setSearchResult (['Vedangi', 'Yashvi']);
      loadSearchResult (); //gets * FROM Profiles 
    }
  }

  const loadSearchResult = () => {
    callApiLoadSearchResult()
      .then(res => {
        console.log("callApiLoadSearchResult returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiLoadSearchResult parsed: ", parsed);
        setSearchResult(parsed);
        console.log(searchResult); //assigns the result
        console.log('results', parsed);
      })
  }

  const callApiLoadSearchResult = async () => {
      const url = serverURL + "/api/getSearchResult";
      console.log(url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
              userSearch : enteredUsername, //passes the enteredUsername through the api
        })
      });
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log("User settings: ", body);
      return body;
  }

  if (isEmpty===false){
    return(
      <Grid>
        <Grid>
          <SearchBar setEnteredUsername={setEnteredUsername} isError={isEmpty}></SearchBar>
          <Button variant="contained" onClick= {runButton} style={{marginLeft: '2vh', marginTop: '2vh', marginBottom: '2vh', width: "20vh", backgroundColor: '#29241C', color: 'white'}}>
            Search
          </Button>
        </Grid>
        <Grid container spacing={2} direction ='column'>
          {searchResult.map((users) => {
            return(
              <Grid xs={12} sm={10} item key={users}>
                <Card>
                  <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar style={{backgroundColor: '#EBD6C1', color: '#B08968', width: '5vh', height: '5vh', fontSize: '2vh', marginRight: '5vh', marginLeft: '3vh'}}>{users.firstName[0]}{users.lastName[0]}</Avatar> 
                    <div>
                      <h3> {users.firstName} {users.lastName} </h3>
                    </div>
                    <div>
                      <Button variant='contained' style={{margin: '45px', width: '100px', color: 'white', backgroundColor: '#29241C' }}>
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid>
        <Grid>
          <SearchBar setEnteredUsername={setEnteredUsername} isError={isEmpty}></SearchBar>
          <Button variant="contained" onClick= {runButton} style={{marginLeft: '2vh', marginTop: '2vh', width: "20vh", color: 'white', backgroundColor: '#29241C'}}>
            Search
          </Button>
        </Grid>
      </Grid>
    )
  }
}


function Friends() {
    return (
        <Grid style={{backgroundColor: '#6D8654', height: '100%'}}> 
          <NavbarTop></NavbarTop>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            style={{padding: '4vh', flexDirection: 'row', flexBasis: '100%', flex: 1}}
          >
            <Grid item xs={6}>
              <h1 style={{color: 'white'}}>Your Friends</h1>
              <ShowFriends></ShowFriends>
            </Grid>
            <Grid item xs={6}>
              <h1 style={{color: 'white'}}>Find Your Friends</h1>
              <SearchFriends></SearchFriends>
            </Grid>
          </Grid>
          <Navbar></Navbar>
        </Grid>     
      )
}

export default Friends;