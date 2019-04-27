const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connect to MongoDB server ');

    const db = client.db('TodoApp');

    // db.collection('Todos').find({ "_id": ObjectID("5cc42f7fec5cf760f86920d1") }).toArray().then((docs) => {
    //     console.log('Todos');
    //     if (docs.length === 0) {
    //         return console.log('Not found');
    //     }
    //     console.log(JSON.stringify(docs, null, 2));
    // }, (err) => {
    //     err && console.log('Unable to fetch todos', err)
    // })

    // db.collection('Todos').find().count()
    //     .then((count) => {
    //         console.log('Todos count: ', count);
    //     }, (err) => {
    //         err && console.log('Unable to fetch todos', err)
    //     })


    db.collection('Users').find().toArray().then((docs) => {
        if (docs.length === 0) {
            return console.log('No users found');
        }
        console.log('Users doc: ', JSON.stringify(docs, null, 2));
    }, (err) => {
        console.log('Unable to count', err)
    })


    // client.close();

})