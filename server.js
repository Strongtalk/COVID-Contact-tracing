const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const csurf = require("csurf");
const sendSMS = require("./sendSMS.js");
const cookieParser = require("cookie-parser");

const staticDir = process.env.DEV ? "./client/public" : "./client/build";

////////////////////////////////////////////testing

// Define DB parameters
const DataStore = require("./data.js");

//let url = `mongodb+srv://covid-app-user:${process.env.DBPASS}@cluster0.kszqh.mongodb.net/<dbname>?retryWrites=true&w=majority`
let url = `mongodb+srv://covid-app-user:${process.env.DBPASS}@cluster0.kszqh.mongodb.net/`;
let userCollection = new DataStore(url, "CovidApp", "User");

console.log("UserCollection: ", userCollection);
let eventCollection = new DataStore(url, "CovidApp", "Event");
let eventContactCollection = new DataStore(url, "CovidApp", "EventContact");
let newsCollection = new DataStore(url, "CovidApp", "News");

// middleware for post
app.use(cookieParser());
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
  let data = await userCollection.readData(request.params.email);
  response.send(data);
});

// get all events coordinating to a specific user id
app.get("/event/:userid", async (request, response) => {
  let data = await eventCollection.readDataEvt(request.params.userid);
  response.send(data);
});

// get individual event based on event id
app.get("/individual-event/:eventid", async (request, response) => {
  let event = await eventCollection.readEventData(request.params.eventid);
  response.send(event);
});

// get all event contacts coordinating to a specific event
app.get("/eventcontact/:eventid", async (request, response) => {
  let data = await eventContactCollection.readEvtContact(
    request.params.eventid
  );
  response.send(data);
});

// get individual contact based on contact id
app.get("/contact/:contactid", async (request, response) => {
  let contact = await eventContactCollection.readContact(request.params.contactid);
  response.send(contact);
});

// get specific event parameters per user based on date
app.get("/events/:userid/:date", async (request, response) => {
  let data = await eventCollection.readDataEvtDate(
    request.params.userid,
    request.params.date
  );
  response.send(data);
});

// Route to read ALL users
app.get("/user", async (request, response) => {
  let data = await userCollection.readData();
  response.send(data);
});

// Route to read ALL News
app.get("/news", async (request, response) => {
  let data = await newsCollection.readNews();
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
  response.redirect("/userlogin-page");
  if (statusObj.status === "ok") {
    //if it work send over a 200/ OK STATUS
    response.status(200).send(statusObj.data);
  } else {
    //if it doesn't work send over a 400 and let us know what the error was pls
    response.status(400).send(statusObj.error);
  }
});

// Updates event entry to database
app.post("/update-event", async (request, response) => {
  //THIS IS ONLY APPLICABLE TO EST!!
  //NEED TO REVISIT WHEN WE GO GLOBAL ;)
  //modify the start time by five hours to offset the mongoDB UTC
  let formSDate = new Date(request.body.date + "T" + request.body.start);
  let sTime = formSDate.getTime();
  let dbTimeStart = sTime - 18000000;

  //modify the end time by five hours to offset the mongoDB UTC
  let formEDate = new Date(request.body.date + "T" + request.body.end);
  let eTime = formEDate.getTime();
  let dbTimeEnd = eTime - 18000000;

  let event = {
    _id: ObjectId(request.body.eventId),
    userid: ObjectId(request.body.userid),
    name: request.body.name.trim(),
    description: request.body.description,
    start: new Date(dbTimeStart),
    end: new Date(dbTimeEnd),
  };

  let statusObj = await eventCollection.update(event);
  // response.cookie("eventId", request.body.eventId);
  response.redirect("/update-event");
});

// creates new event entry to database
app.post("/event", async (request, response) => {
  //THIS IS ONLY APPLICABLE TO EST!!
  //NEED TO REVISIT WHEN WE GO GLOBAL ;)
  //modify the start time by five hours to offset the mongoDB UTC
  let formSDate = new Date(request.body.date + "T" + request.body.start);
  let sTime = formSDate.getTime();
  let dbTimeStart = sTime - 18000000;

  //modify the end time by five hours to offset the mongoDB UTC
  let formEDate = new Date(request.body.date + "T" + request.body.end);
  let eTime = formEDate.getTime();
  let dbTimeEnd = eTime - 18000000;
  let expireTime = dbTimeEnd + 5270400000;

  let newEvent = {
    userid: ObjectId(request.body.userid),
    name: request.body.name.trim(),
    description: request.body.description,
    start: new Date(dbTimeStart),
    end: new Date(dbTimeEnd),
    expireAt: new Date(expireTime),
  };

  let statusObj = await eventCollection.insert(newEvent);

  response.cookie("eventId", statusObj);
  response.redirect("/addinfo-page");
  if (statusObj.status === "ok") {
    //if it work send over a 200/ OK STATUS
    response.status(200).send(statusObj.data);
  } else {
    //if it doesn't work send over a 400 and let us know what the error was pls
    response.status(400).send(statusObj.error);
  }
});

// creates new event contact entry in DB
app.post("/eventcontact", async (request, response) => {
  let newEventContact = {
    eventid: ObjectId(request.body.eventid),
    name: request.body.name,
    type: request.body.type,
    email: request.body.email,
    phone: request.body.phone,
  };

  let statusObj = await eventContactCollection.insert(newEventContact);
  response.redirect("/addinfo-page");
  if (statusObj.status === "ok") {
    //if it work send over a 200/ OK STATUS
    response.status(200).send(statusObj.data);
  } else {
    //if it doesn't work send over a 400 and let us know what the error was pls
    response.status(400).send(statusObj.error);
  }
});

// Updates contact entry to database
app.post("/update-contact/:contactId", async (request, response) => {

  let contact = {
    _id: ObjectId(request.body.contactId),
    name: request.body.name.trim(),
    email: request.body.email,
    phone: request.body.phone
  };

  let statusObj = await eventContactCollection.update(contact)
  response.redirect("/update-info");
});



// sends alert
app.post("/send-alert", (request, response) => {
  // hard coded number and message //
  sendSMS("8023388026", "Alert, Someone you came in contact with in the last two weeks has tested POSITIVE for COVID-19");
  sendSMS("9782219788", "Alert, Someone you came in contact with in the last two weeks has tested POSITIVE for COVID-19");
  response.send({ ok: true });
});

//remove event and contacts assocaited with event
app.post("/remove/:id", async (req, res) => {
  let target = req.params.id;
  console.log(target);
  await eventContactCollection.removeContact(target);
  await eventCollection.remove(target);
  console.log("REMOVED ITEM SUCCESSFULLY SERVER LINE 188");
});

module.exports = DataStore;

////////////////////////////////////////////////////////////////////////////

// Use morgan for HTTP request logging in dev and prod
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// Serve static assets
app.use(express.static(path.join(__dirname, "client")));

// Parse incoming form-encoded HTTP bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Create and manage HTTP sessions for all requests
app.use(
  session({
    secret: process.env.APP_SECRET || "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Use connect-flash to persist informational messages across redirects
app.use(flash());

// Handle 404
app.use(function (request, response, next) {
  response.status(404);
  response.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

// handle error
app.use(function (err, request, response, next) {
  response.status(500);
  response.send(err);
});

// config
var requiredConfig = [
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_NUMBER,
];
var isConfigured = requiredConfig.every(function (configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    "TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.";

  throw new Error(errorMessage);
}
