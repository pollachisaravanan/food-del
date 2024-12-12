import { MongoClient } from 'mongodb';
var url = "mongodb+srv://msaravanakumar:28-Sep-00@cluster0.yf9o3i4.mongodb.net/";
let dbInstance = null;
let dbName = 'sample_airbnb'

export const Connect = async () =>{
    try {
        const client = await MongoClient.connect(url); // Await the promise-based connection
        console.log(' Mongo DB Connected!');
        dbInstance = client.db(dbName);
        //console.log(dbInstance)
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
    }
    return dbInstance;
}
