const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const staticDir = process.env.DEV ? "./client/public" : "./client/build";

// Define DB parameters
const DataStore = require("./data.js");

//let url = `mongodb+srv://covid-app-user:${process.env.DBPASS}@cluster0.kszqh.mongodb.net/<dbname>?retryWrites=true&w=majority`
let url = `mongodb+srv://covid-app-user:${process.env.DBPASS}@cluster0.kszqh.mongodb.net/`;
let userCollection = new DataStore(url, "CovidApp", "User");

console.log("UserCollection: ", userCollection);
let eventCollection = new DataStore(url, "CovidApp", "Event");
let eventContactCollection = new DataStore(url, "CovidApp", "EventContact");

// middleware for post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// start the server
app.listen(port, () => console.log(`Example app listening port ${port}`));

// setup path for root path
app.get("/", (req, res) => {
  res.send("Test of Covid Server");
});

// Route to read a user based on email
app.get("/user/:email", async (request, response) => {
  let data = await userCollection.readData(request.params.email)
  response.send(data)
})

// get all events coordinating to a specific user id 
app.get("/event/:userid", async (request, response) => {
  let data = await eventCollection.readDataEvt(request.params.userid)
  response.send(data)
})

// get specific event parameters per user based on date
app.get("/events/:userid", async (request, response) =>{
  let data = await eventCollection.readDataEvtDate(request.params.userid)
  response.send(data)
})

// Route to read ALL users
app.get("/user", async (request, response) => {
  let data = await userCollection.readData();
  response.send(data);
});

//creates new user entry to database
app.post("/user", async (request, response) => {
  // variable assigned for every user (nonadmin role for dev)
  let privilege = "non-admin";
  //read form as is from input
  let newUser = {
    name: request.body.name,
    street: request.body.street,
    city: request.body.city,
    zip: request.body.zip,
    email: request.body.email,
    cell: request.body.cell,
    role: privilege,
  };
  // call on our insert method to connect to the user collection and create new user
  let statusObj = await userCollection.insert(newUser);
  if (statusObj.status === "ok") {
    //if it work send over a 200/ OK STATUS
    response.status(200).send(statusObj.data);
  } else {
    //if it doesn't work send over a 400 and let us know what the error was pls
    response.status(400).send(statusObj.error);
  }
});

app.post("/event", async (request, response) => {
  let newEvent = {
    userid: ObjectId(request.body.userid),
    name: request.body.name.trim(),
    description: request.body.description,
    start: new Date(request.body.start),
    end: new Date(request.body.end),
  };

  let statusObj = await eventCollection.insert(newEvent);
  if (statusObj.status === "ok") {
    //if it work send over a 200/ OK STATUS
    response.status(200).send(statusObj.data);
  } else {
    //if it doesn't work send over a 400 and let us know what the error was pls
    response.status(400).send(statusObj.error);
  }
});

app.post("/eventcontact", async (request, response) => {
    let newEventContact = {
        eventid: ObjectId(request.body.eventid),
        name: request.body.name,
        type: request.body.type,
        email: request.body.email,
        phone: request.body.phone
    }

    let statusObj = await eventContactCollection.insert(newEventContact);
    if (statusObj.status === "ok") {
        //if it work send over a 200/ OK STATUS
        response.status(200).send(statusObj.data);
      } else {
        //if it doesn't work send over a 400 and let us know what the error was pls
        response.status(400).send(statusObj.error);
      }
})

module.exports = DataStore;
