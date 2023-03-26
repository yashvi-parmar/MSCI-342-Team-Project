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

app.post('/api/getSafeLocations', (req,res) => {

	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM SafeLocations'
	console.log(sql);
	let data = []

	connection.query(sql, data, (error,data) => {
		if (error) {
			return res.json({ status : "ERROR", error});
		}
		let string = JSON.stringify(data);
		let obj = JSON.parse(string);
		res.send({ safeData: obj });
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
	user = req.body.username,
	address = req.body.address
	
	  
	let sql = "INSERT INTO `Alerts` (lat, lng, alert, username,address) VALUES (?,?,?,?,?)";
	let data=[lat, lng, alertMessage, user,address];
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

	username = req.body.username,
	latitude = req.body.latitude,
	longitude = req.body.longitude

	let sql = "UPDATE `Profiles` SET longitude='" + longitude + "' ,latitude = '" + latitude + "' WHERE userName = '" + username + "' AND userID > 0";
	let data=[longitude,latitude,username];
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

	let sql = "SELECT * FROM Profiles WHERE userName = ?";
	let data = [username]
	console.log(sql);
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({data:string})
		console.log(data);
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
		let string = JSON.stringify(results);
		res.send({data:string})
	 });
	 connection.end();
 });

 app.post('/api/GetFriends', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username;
	  
	let sql = "SELECT CONCAT(Profiles.firstName,' ',Profiles.lastName) AS FullName, Profiles.longitude, Profiles.latitude, Profiles.userName, Profiles.email FROM Profiles INNER JOIN Friends ON Friends.FriendUsername=Profiles.userName WHERE Friends.username=?";
	let data=[username];
	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(results);
		let obj = JSON.parse(string);
		res.send({ friendData: obj });
	 });
	 connection.end();
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

app.post('/api/getAuthorities', (req, res) => {

	let connection = mysql.createConnection(config);
	let sql = `SELECT * FROM authorities`;
	let data = []

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		let obj = JSON.parse(string);
		res.send({ authData: obj });
	});

	connection.end();
});

app.post('/api/getFriendsEmails', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username
	let sql = "SELECT p.email FROM Friends f INNER JOIN Profiles p ON f.friendUsername = p.userName WHERE f.username = " + username;

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

app.post('/api/getProfiles', (req, res) => {

	let connection = mysql.createConnection(config);

	userID = req.body.userID;
	  
	let query = "SELECT * FROM Profiles WHERE userID= ?";
	let data=[userID];
	console.log(query);
	console.log(data);       
 
	connection.query(query, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		let obj = JSON.parse(string);
		res.send({ string });
	 });
	 connection.end();
 });

 app.post('/api/getYourAlerts', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username
	
	let sql =  "SELECT * FROM Alerts WHERE username = ? ORDER BY timestamp DESC LIMIT 2";
	let data=[username];

	console.log(sql);
	console.log(data);       
 
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		let obj = JSON.parse(string);
		res.send({ obj });
	 });
	 connection.end();
 });

 app.post('/api/addFriend', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username,
	friendUsername = req.body.friendUsername
	
	let sql = "INSERT INTO `Friends` (username,friendUsername) VALUES (?,?)";
	let data=[username,friendUsername];

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

 app.post('/api/getTop5Alerts', (req,res) => {

	let connection = mysql.createConnection(config);

	let sql = 'SELECT * FROM Alerts ORDER BY timestamp DESC LIMIT 4'
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

app.post('/api/getEmergencyContacts', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username;
	  
	let query = "SELECT * FROM Emergency_Contacts WHERE username = ?";
	let data=[username];
	console.log(query);
	console.log(data);       
 
	connection.query(query, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		console.log(string);
		let obj = JSON.parse(string);
		res.send({ obj });
	 });
	 connection.end();
 });

 app.post('/api/addEmergencyContacts', (req, res) => {

	let connection = mysql.createConnection(config);

	username = req.body.username,
	contactName= req.body.contactName,
	contactPhoneNumber = req.body.contactPhoneNumber
	
	let sql = "INSERT INTO `Emergency_Contacts` (username,contactName,contactPhoneNumber) VALUES (?,?,?)";
	let data=[username,contactName,contactPhoneNumber];

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

app.listen(port, () => console.log(`Listening on port ${port}`)); 
//for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server