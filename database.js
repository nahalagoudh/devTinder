// const URI = "mongodb+srv://goudhnahla:UVaxWjCXuvyc6rPp@namastenode.mjyn4.mongodb.net/"

const { MongoClient } = require('mongodb');


// Connection URL
const url = 'mongodb+srv://goudhnahla:UVaxWjCXuvyc6rPp@namastenode.mjyn4.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'SampleDtabase';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('user');
    const data = {
        firstname: "safitha",
        secondname: "ibrahim",
        city: "vadakara",
        mobile: "976798098"
    }

    const insertResult = await collection.insertOne(data);
    console.log('Inserted documents =>', insertResult);

    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    const deleteResult = await collection.deleteMany({ firstname: "safitha" });
    console.log('Deleted documents =>', deleteResult);

    const Result = await collection.find({ firstname: "muna" }).count();
    console.log('Result =>', Result);

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

