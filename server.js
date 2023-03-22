let mysql = require('mysql');
let config = require('./config.js');
require('dotenv').config();
const fetch = require('node-fetch');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const recipes = [
	{id: 1, lat: 43.472120, lng:-80.543550, text: "Avoid due to a broken streetlight"}, 
  
	{id: 2, lat: 43.472118, lng:-80.563546, text: "Avoid due to flooding"}, 
  
  ];

console.log(recipes)
//app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static(path.join(__dirname, "client/public")));

app.post('/api/loadAlerts', (req, res) => {
	console.log(recipes)
	let string = JSON.stringify(recipes);
	console.log(recipes)
	console.log(string.text());
	res.send({ express: string });
});
app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/getAlerts', (req,res) => {

	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM Alerts'
	console.log(sql);
	let data = []

	connection.query(sql, data, (error,data) => {
		if (error) {
			return res.json({ status : "ERROR", error});
		}
		let string = JSON.stringify(data);
		let obj = JSON.parse(string);
		res.send({ alertData: obj });
	});
	connection.end();
});

app.get('/api/getUser', (req,res) => {

	let connection = mysql.createConnection(config);

	let sql = 'SELECT firstName FROM User'
	console.log(sql);
	let data = []

	connection.query(sql, data, (error,data) => {
		if (error) {
			return res.json({ status : "ERROR", error});
		}
		let string = JSON.stringify(data);
		let obj = JSON.parse(string);
		res.send({ name: obj });
	});
	connection.end();
});

app.post('/api/addAlert', (req, res) => {

	console.log('addAlert was called');
	let connection = mysql.createConnection(config);

	lat = req.body.lat,
	lng = req.body.lng,
	alertMessage = req.body.alertMessage, 
	user = req.body.userID
	
	  
	let sql = "INSERT INTO `Alerts` (lat, lng, alert, user) VALUES (?,?,?,?)";
	let data=[lat, lng, alertMessage, user];
	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({message: "Message successfully added"});
	 });
	 connection.end();
 });

 app.post('/api/addProfile', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username,
	email = req.body.email, 
	password = req.body.password,
	firstName = req.body.firstName,
	lastName = req.body.lastName
	
	let sql = "INSERT INTO `Profiles` (userName, email, password,firstName,lastName) VALUES (?,?,?,?,?)";
	let data=[username, email, password,firstName,lastName];

	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({message: "Account successfully added"});
	 });
	 connection.end();
 });

 app.post('/api/addSavedDestination', (req, res) => {

	let connection = mysql.createConnection(config);

	address = req.body.address
	user = req.body.user
	  
	let sql = "INSERT INTO savedDestinations (address, user) VALUES (?,?)"
	let data=[address, user];
	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({message: "Destination successfully added"});
	 });
	 connection.end();
 });

 app.post('/api/getSavedDestinations', (req,res) => {

	let connection = mysql.createConnection(config);

	user = req.body.user

	let sql = "SELECT * FROM savedDestinations WHERE user = " + user
	console.log(sql);
	let data = []

	connection.query(sql, data, (error,data) => {
		if (error) {
			return res.json({ status : "ERROR", error});
		}
		let string = JSON.stringify(data);
		let obj = JSON.parse(string);
		res.send({ destinationsData: obj});
	});
	connection.end();
});

app.post('/api/UpdateLastSeenLocated', (req, res) => {

	let connection = mysql.createConnection(config);

	userID = req.body.userID,
	latitude = req.body.latitude,
	longitude = req.body.longitude

	let sql = "UPDATE `Profile` SET longitude='?' AND latitude = '?' WHERE userID = '?' VALUES (?,?,?)";
	let data=[longitude,latitude,userID];
	console.log(sql);
	console.log(data);       

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		res.send({message: "Location Successfully Updated"});
	 });
	 connection.end();
 });

 app.post('/api/checkAccount', (req,res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username

	let sql = "SELECT * FROM Alerts WHERE userName ='?' VALUES (?)"
	let data = [username]
	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error,data) => {
		if (error) {
			return res.json({ status : "ERROR", error});
		}
		let string = JSON.stringify(data);
		if(string==""){
			return res.send(false)
		}else {
			return res.send(true)
		}
	});
	connection.end();
});

app.post('/api/SearchUser', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username,
	password = req.body.password
	  
	let sql = "SELECT * FROM Profiles WHERE userName='" + username + "' AND password = '" + password + "' ";
	let data=[username,password];
	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(data);
		res.send({data:string})
	 });
	 connection.end();
 });

 app.post('/api/GetFriends', (req, res) => {

	let connection = mysql.createConnection(config);

	userID = req.body.userID;
	  
	let sql = "SELECT CONCAT(firstName,' ',lastName) AS FullName, longitude, latitude FROM Profiles INNER JOIN Friends ON Friends.FriendUserID=Profiles.userID WHERE Friends.userID='?' VALUES(?)";
	let data=[userID];
	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(data);
		res.send({data:string})
	 });
	 connection.end();
 });

 app.post('/api/loadAlerts', (req, res) => {
	let string = JSON.stringify(recipes);
	console.log(string);
	res.send({ express: string });
});

app.post('/api/getSearchResult', (req, res) => {

	let connection = mysql.createConnection(config);

	let username = `SELECT * FROM Profiles WHERE userName LIKE CONCAT (?, "%")`;

	let data = [req.body.userSearch];
	console.log(data);

	connection.query(username, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});

	connection.end();
});

app.post('/api/getFriendsEmails', (req, res) => {

	let connection = mysql.createConnection(config);

	userID = req.body.userID
	let sql = "SELECT p.email FROM Friends f INNER JOIN Profiles p ON f.friendUserID = p.userID WHERE f.userID = " + userID;

	let data = [];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ friendEmailData: obj });
	});

	connection.end();
});


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server