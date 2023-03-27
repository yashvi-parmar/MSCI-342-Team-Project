import React from 'react';
import Grid from "@material-ui/core/Grid";
import Navbar from '../NavBar';
import NavbarTop from '../NavBarTop';
import { Card, CardContent, Typography} from '@material-ui/core';
import {Avatar, Link } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../Home/index.css'
import { useSelector } from 'react-redux';
import store from '../../store';
import { useColorScheme } from '@mui/material';
const serverURL = ""; //enable for dev mode
// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:PORT";

const ShowFriends = (props) => {
  console.log("THIS IS FRIENDS:" + props.friends);
  const fri = props.friends;
  const firstNames = fri.map(friend => friend.firstName);
  const lastNames = fri.map(friend => friend.lastName);
  const userNames = fri.map(friend => friend.userName);
  const emails = fri.map(friend => friend.email);
  const firstLetters = firstNames.map((first) => first[0].toUpperCase());
  const lastLetters = lastNames.map((last) => last[0].toUpperCase());

  return (
    <Grid container spacing={2} direction="column" >
      {firstNames.map((fri, index) => (
        <Grid xs={12} sm={12} item key={fri} style={{marginRight: '5vh'}}>
          <Card style={{ borderRadius: '5px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{backgroundColor: '#EBD6C1', color: '#B08968', width: '10vh', height: '10vh', fontSize: '4vh', marginRight: '5vh', marginLeft: '3vh'}}>{firstLetters[index]}{lastLetters[index]}</Avatar> 
            <div>
              <h3>{fri} {lastNames[index]} </h3>
              <h5 style={{marginTop: '0px', marginBottom: '0px'}}>username: {userNames[index]}</h5>
              <h5 style={{marginTop: '0px', marginBottom: '0px'}}>email: {emails[index]}</h5>
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
  const [addedUsers, setAddedUsers] = React.useState(new Set());

  const currentUser = useSelector((state) => state.user.userNameGlobal);
  
  const runButton = event => {
    event.preventDefault();

    setIsEmpty (false);

    if (enteredUsername === ''){
        setIsEmpty (true);
    } else {
      loadSearchResult (); //gets * FROM Profiles 
    }
  }

  const handleSubmission = (users) => {
    loadApiAddFriend(users);
      setAddedUsers((prevState) => new Set(prevState).add(users.userName));
  }

  const loadApiAddFriend = (users) => {
    callApiAddFriend(users)
      .then((res) => {
        console.log(res.message);
      })
  };
  
  
  
   const callApiAddFriend= async (users) => {
    const url = serverURL + '/api/addFriend';
  
    let FriendInfo = { 
      "username": store.getState().user.userNameGlobal,
      "friendUsername" : users.userName
    };
  
    console.log(FriendInfo);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(FriendInfo)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
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

      let searchInfo = { 
        "username": store.getState().user.userNameGlobal,
        "userSearch" : enteredUsername,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchInfo)
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
          <Button variant="contained" onClick= {runButton} style={{ fontFamily: 'Oswald', marginLeft: '2vh', marginTop: '2vh', marginBottom: '2vh', width: "20vh", backgroundColor: '#29241C', color: 'white'}}>
            Search
          </Button>
        </Grid>
        <Grid container spacing={2} direction ='column'>
        {searchResult.map((users) => (
          <Grid item xs={12} sm={11} key={users.userName} style={{marginRight: '5vh'}}>
            <Card style={{ borderRadius: '5px' }}>
              <CardContent style={{ display: 'flex', alignItems: 'center', backgroundColor: '#29241C', height: '15vh'}}>
                <Avatar
                  style={{
                    backgroundColor: '#EBD6C1',
                    color: '#B08968',
                    width: '10vh',
                    height: '10vh',
                    fontSize: '4vh',
                    marginRight: '5vh',
                    marginLeft: '3vh',
                  }}
                >
                  {users.firstName[0].toUpperCase()}
                  {users.lastName[0].toUpperCase()}
                </Avatar>
                <div>
                  <h3 style={{color: 'white', marginBottom: '1vh'}}>
                    {users.firstName} {users.lastName}
                  </h3>
                  <h5 style={{color: 'white', marginTop: '0vh'}}>username: {users.userName}</h5>
                </div>
                {!addedUsers.has(users.userName) && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleSubmission(users)}
                      style={{
                        marginRight: '5vh',
                        width: '10vh',
                        color: 'white',
                        backgroundColor: '#EBD6C1',
                        color: 'black'
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid>
        <Grid>
          <SearchBar setEnteredUsername={setEnteredUsername} isError={isEmpty}></SearchBar>
          <Button variant="contained" onClick= {runButton} style={{marginLeft: '2vh', fontFamily: 'Oswald', marginTop: '2vh', width: "20vh", color: 'white', backgroundColor: '#29241C'}}>
            Search
          </Button>
        </Grid>
      </Grid>
    )
  }
}

function Friends() {
  let [friends,setFriends]=React.useState([]);
  
  React.useEffect(() => {
    //loadUserSettings();
    loadGetFriends();
   },[]);

   const loadGetFriends =() => {
    callGetFriends()
      .then(res => {
        setFriends(res.friendData);
        console.log(friends);
      });
  }

  const callGetFriends = async() => {
    const url = serverURL + "/api/GetFriends";
    console.log(url);
  
    let userData = {
      "username": store.getState().user.userNameGlobal
    }
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  }

    return (
        <Grid style={{backgroundColor: '#6D8654', height: '100vh', fontFamily: 'Noto Sans Lepcha'}}> 
          <NavbarTop></NavbarTop>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            style={{padding: '4vh', flexDirection: 'row', flexBasis: '100%', flex: 1}}
          >
            <Grid item xs={6} style={{marginTop: '8vh'}}>
              <h1 style={{color: 'white', fontFamily: 'Oswald'}}>FRIENDS</h1>
              <ShowFriends friends={friends}/>
            </Grid>
            <Grid item xs={6} style={{marginTop: '8vh', backgroundColor: 'white', borderRadius: '5px', paddingLeft: '5vh', paddingBottom: '5vh'}}>
              <h1 style={{color: '#29241C', fontFamily: 'Oswald'}}>FIND MY FRIENDS</h1>
              <SearchFriends></SearchFriends>
            </Grid>
          </Grid>
          <Navbar></Navbar>
        </Grid>  
      )
}

export default Friends;