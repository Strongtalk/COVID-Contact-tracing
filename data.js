const { ObjectId, MongoClient } = require("mongodb");
const opengraph = require('opengraph-io')({ appId: '0cf4e9d0-e165-4cc8-8cd7-c20f1dd7cc29' });

class DataStore {
  constructor(url, dbName, collectionName) {
    this.url = url;
    this.dbName = dbName;
    this.collName = collectionName;
    this.connection = null;
  }

  // Establish a connection to Mongo DB
  async connect() {
    // check if connection already exists
    if (this.connection && this.connection.isConnected()) {
      return this.connection;

      // if not, create connection and return it
    } else {
      const client = await MongoClient.connect(this.url, {
        useUnifiedTopology: true,
      });
      this.connection = client;
      return this.connection;
    }
  }

  async collection() {
    const client = await this.connect();
    const database = client.db(this.dbName);
    const collection = database.collection(this.collName);
    return collection;
  }

  // Read all Users
  async readData() {
    let client = await this.connect();
    let db = await client.db(this.dbName);
    const collection = db.collection(this.collName);
    let dataArr = await collection.find({}).toArray();
    return dataArr;
  }

  // Read a single user based on query criteria
  async readData(email) {
    let users = [];
    let client = await this.connect();
    let db = await client.db(this.dbName);
    const collection = db.collection(this.collName);
    await collection.find({ email: email }).forEach((user) => {
      users.push(user);
    });
    return users;
  }

  //reads all events in database for a user
  async readDataEvt(userid) {
    let events = [];
    let collection = await this.collection();
    await collection.find({ userid: ObjectId(userid) }).forEach((event) => {
      events.push(event);
    });
    return events;
  }

    //reads all events in database for a user
    async readEvtContact(eventid) {
      let events = [];
      let collection = await this.collection();
      await collection.find({ eventid: ObjectId(eventid) } ).forEach((event) => {
        events.push(event);
      });
      return events;
    }

  //search for user events within a specific date frame
  async readDataEvtDate(userid, date) {
    let events = [];
    //did hardcode this will probably have to modify
    // REMINDER *months start at 0 if they are put in as number!!!!*
    console.log(date)
    let searchDate = new Date(date)
    console.log(searchDate)
    let collection = await this.collection();
    await collection.find({ "start": { $gte: searchDate }, userid: ObjectId(userid) }).forEach((event) => {
      events.push(event);

    });
    console.log(events)
    return events;
  }

  //write to database- user collection
  async insert(object) {
    let response = { status: null, error: null, id:null };
    try {
      let collection = await this.collection();
      console.log("inserting item");
      await collection.insertOne(object).then((res)=> response.id= res.insertedId)
      console.log("Success adding item");
      response.status = "ok";
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response.id
  }

  //reads all news in database 
  async readNews() {
    let client = await this.connect();
    let db = await client.db(this.dbName);
    const collection = db.collection(this.collName);
    let dataArr = await collection.find({}).toArray();

    let articleSummary = []
    for (const article of dataArr) {
      let siteUrl = article.url;

      // Call open graph endpoint to get summary info for a particlar URL
      // Add elements to new array that is ultimately returned containing summary info
      await opengraph.getSiteInfo(siteUrl)
        .then(function (result) {
          articleSummary.push(result.hybridGraph)
        });
    }

    return articleSummary;
  }

  // reads all news for a particular geographic area
  // geographic area is based on audienceScope - e.g. county, state, country
  // and audienceTarget - e.g array that identifies one or more counties, states, countries
  // where the news article would be of potential interest
  async readNewsAudience(newsLevel, newsAudience) {
    let newsArticles = [];

    console.log('newsLevel: ' + newsAudience)
    console.log(newsAudience[newsLevel])

    let collection = await this.collection();
    await collection.find({ "newsLevel": { $eq: newsLevel }, "newsAudience": { $in: newsAudience[newsLevel] } }).forEach((article) => {
      newsArticles.push(article);
    });

    return newsArticles;
  }


}

module.exports = DataStore;
