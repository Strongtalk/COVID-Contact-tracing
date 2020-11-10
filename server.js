const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const path = require('path')
require("dotenv").config();

const staticDir = process.env.DEV ? "./client/public" : "./client/build";

// Define DB parameters
const DataStore = require("./data.js");

//let url = `mongodb+srv://covid-app-user:${process.env.DBPASS}@cluster0.kszqh.mongodb.net/<dbname>?retryWrites=true&w=majority`
let url = `mongodb+srv://covid-app-user:${process.env.DBPASS}@cluster0.kszqh.mongodb.net/`
let userCollection = new DataStore(url, "CovidApp", "User");

console.log('UserCollection: ', userCollection)
let eventCollection = new DataStore(url, "CovidApp", "Event");
let eventContactCollection = new DataStore(url, "CovidApp", "EventContact");

// start the server
app.listen(port, () => console.log(`Example app listening port ${port}`))

// setup path for root path
app.get('/', (req, res) => {
    res.send('Test of Covid Server')
})

// Route to read ALL users 
app.get('/get', async (request, response) => {
    console.log('Reading all users')
    let data = await userCollection.readData();
    console.log('Data is ', data)
	response.send(data);
});

module.exports = DataStore;