const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useUnifiedTopology: true, useNewUrlParser: true}, (error, client) => {
    if (error){
        console.log('Unable to connect to database.');
    } else {
        const db = client.db(databaseName);
        db.collection('users').insertOne({
            name: 'Steve',
            age: 34
        });
    }
});
