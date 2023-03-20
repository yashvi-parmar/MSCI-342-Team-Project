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

//app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.static(path.join(__dirname, "client/public")));

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
	password = req.body.password
	
	  
	let sql = "INSERT INTO `Accounts` (username, email, password) VALUES (?,?,?)";
	let data=[username, email, password];
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
	  
	let sql = "INSERT INTO 'savedDestinations' (address, user)"
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

 app.post('/api/getSavedDestination', (req,res) => {

	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM savedDestinations WHERE user = 1'
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

app.post('/api/UpdateLastSeenLocated', (req, res) => {

	let connection = mysql.createConnection(config);

	user1D = req.body.userID,
	location = req.body.location

	let sql = "UPDATE `Profile` SET lastSeen = '?' WHERE userID = '?' VALUES (?,?)";
	let data=[location,userID];
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

	username = req.body.username,
	email = req.body.email, 
	phoneNumber = req.body.phoneNumber

	let sql = 'SELECT * FROM Alerts WHERE userName =? OR email=? OR phoneNumber=?' 
	let data = [username,email,phoneNumber]
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


app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
