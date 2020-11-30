const { ObjectId, MongoClient } = require("mongodb");
const opengraph = require("opengraph-io")({
  appId: "0cf4e9d0-e165-4cc8-8cd7-c20f1dd7cc29",
});

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

  // Helper function to make it easier to connect and access specific connections
  async collection() {
    const client = await this.connect();
    const database = client.db(this.dbName);
    const collection = database.collection(this.collName);
    return collection;
  }

  /*--------- USER Endpoints -----------*/

  // Read all Users
  async readData() {
    const collection = await this.collection();
    let dataArr = await collection.find({}).toArray();
    return dataArr;
  }

  // Read a single user based on query criteria
  async readData(email) {
    let users = [];
    const collection = await this.collection();
    await collection.find({ email: email }).forEach((user) => {
      users.push(user);
    });
    return users;
  }

  /*--------- EVENT Endpoints -----------*/

  // Read all events in database for a user
  async readDataEvt(userid) {
    let events = [];
    let collection = await this.collection();
    await collection.find({ userid: ObjectId(userid) }).forEach((event) => {
      events.push(event);
    });
    return events;
  }

  // Read event data for a specific event
  async readEventData(eventid) {
    console.log("reading event: ", eventid);
    let event = null;
    let collection = await this.collection();
    event = await collection.findOne({ _id: ObjectId(eventid) });
    return event;
  }

  // Read all event contacts in database for a specific user
  async readEvtContact(eventid) {
    let events = [];
    let collection = await this.collection();
    await collection.find({ eventid: ObjectId(eventid) }).forEach((event) => {
      events.push(event);
    });
    return events;
  }

  // Search for user events within a specific date frame
  async readDataEvtDate(userid, date) {
    let events = [];

    // Setup search dates for query;
    let startDate = new Date(date);
    let endDate = new Date(date);
    endDate = endDate.setDate(startDate.getDate() + 1);
    let newEndDate = new Date(endDate);

    console.log("userid: ", userid);
    console.log("start/end dates: ", startDate, newEndDate);

    let collection = await this.collection();

    // Execute query to obtain events between startDate and End Date (start date + 1 day)
    await collection
      .find({
        $and: [
          {
            $and: [
              { start: { $gte: startDate } },
              { start: { $lt: newEndDate } },
            ],
          },
          { $and: [{ userid: ObjectId(userid) }] },
        ],
      })
      .forEach((event) => {
        events.push(event);
      });

    console.log("Events found = ", events);

    return events;
  }

  /*--------- NEWS Endpoints -----------*/

  //reads all news in database
  async readNews() {
    let client = await this.connect();
    let db = await client.db(this.dbName);
    const collection = db.collection(this.collName);

    // query DB and retrieve all covid news
    let dataArr = await collection.find({}).toArray();

    let newsCollection = [] 

    // Using OpenGraph endpoint, get article summary for each article
    for (const article of dataArr) {
      
      // Call open graph endpoint to get summary info for a particlar URL
      // Add elements to new array that is ultimately returned containing summary info
      await opengraph.getSiteInfo(article.url).then(function (result) {
        let news = 
        {
          newsLevel : article.newsLevel,
          newsAudience : article.newsAudience,
          newsSummary : result.hybridGraph
        }
        newsCollection.push(news);
      });
    }

    return   newsCollection;
  }

  // reads all news for a particular geographic area
  // geographic area is based on audienceScope - e.g. county, state, country
  // and audienceTarget - e.g array that identifies one or more counties, states, countries
  // where the news article would be of potential interest
  async readNewsAudience(newsLevel, newsAudience) {
    let newsArticles = [];

    console.log("newsLevel: " + newsAudience);
    console.log(newsAudience[newsLevel]);

    let collection = await this.collection();
    await collection
      .find({
        newsLevel: { $eq: newsLevel },
        newsAudience: { $in: newsAudience[newsLevel] },
      })
      .forEach((article) => {
        newsArticles.push(article);
      });

    return newsArticles;
  }

  // write to database- user collection
  async insert(object) {
    let response = { status: null, error: null, id: null };
    try {
      let collection = await this.collection();
      console.log("inserting item");
      await collection
        .insertOne(object)
        .then((res) => (response.id = res.insertedId));
      console.log("Success adding item");
      response.status = "ok";
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response.id;
  }

  // update object in db
  async update(updateObj) {
    // set option so that insert does NOT occur if specified record being updated is not found
    const options = { upsert: false };

    // set query object which is used to locate record that will be updated
    const query = { _id: updateObj._id };

    // set updateRec and include $set to update record
    const updateRec = {
      $set: updateObj,
    };

    let response = { status: null, error: null, id: null };
    try {
      let collection = await this.collection();

      await collection.updateOne(query, updateRec, options).then((result) => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
          console.log(
            "Record was successfully updated",
            matchedCount,
            modifiedCount
          );
          response.status = "ok";
        }
      });
    } catch (error) {
      response.error = error.toString();
      console.log("Update of record failed: ", error.toString());
    }
    return response.id;
  }

  //to delete one event
  async remove(id) {
    const client = await this.connect();
    const db = await client.db(this.dbName);
    const collection = await db.collection(this.collName);
    let targetId = ObjectId(id);
    await collection.deleteOne({ _id: targetId });
  }

  //to delete contacts upon deleting event that are associated with the event
  async removeContact(id) {
    const client = await this.connect();
    const db = await client.db(this.dbName);
    const collection = await db.collection(this.collName);
    let targetId = await collection.find({ eventid: ObjectId(id) }).toArray();
    console.log(id);
    await collection.deleteMany({ eventid: ObjectId(id) });
  }
}

module.exports = DataStore;
