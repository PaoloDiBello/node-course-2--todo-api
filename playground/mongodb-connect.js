const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log('obj', obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connect to MongoDB server ');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: true
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', todo);
    //     }

    //     console.log(JSON.stringify(res.ops, undefined, 2));

    // })

    // db.collection('Users').insertOne({
    //     name: 'Paolo',
    //     age: 20,
    //     location: 'Japan'
    // }, (err, res) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err)
    //     }
    //     console.log(JSON.stringify(res.ops, undefined, 2));
    //     console.log('Timestamp', res.ops[0]._id.getTimestamp())
    // })


    client.close();

})