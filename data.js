const { ObjectId, MongoClient } = require("mongodb");

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
  async readDataByEmail(email) {
    console.log('read  by email : ', email)
    let client = await this.connect();
    let db = await client.db(this.dbName);
    const collection = db.collection(this.collName);
    let data = await collection.find({"email":email});
    console.log('data: ', data)
    return data;
  }

  //write to database- user collection
  async insert(object) {
    let response = { status: null, error: null };
    try {
      let collection = await this.collection();
      console.log("inserting item");
      await collection.insertOne(object);
      console.log("Success adding item");
      response.status = "ok";
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response;
  }
}

module.exports = DataStore;
