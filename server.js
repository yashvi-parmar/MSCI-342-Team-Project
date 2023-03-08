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

app.use(express.static(path.join(__dirname, "client/build")));


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

//---------------------------------------------------------

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

	let connection = mysql.createConnection(config);

	location = req.body.alertLocation,
	alertMessage = req.body.alertMessage, 
	user = req.body.userID
	
	  
	let sql = "INSERT INTO `Alerts` (location, alert, user) VALUES (?,?,?)";
	let data=[location, alertMessage, user];
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

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
