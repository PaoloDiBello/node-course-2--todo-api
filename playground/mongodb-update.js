const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connect to MongoDB server ');

    const db = client.db('TodoApp');


    // db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5cc4565ff40d97c3abaf041a') },

    //     {
    //         $set: { completed: true }
    //     }, { returnOriginal: false }).then((result) => {
    //         console.log('result', result)
    //     })


    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('5cc4312ba2e54405b8803876') },
        {
            $set: {
                name: 'Paolo'
            },
            $inc: {
                age: -1
            }
        },
        { returnOriginal: false }).then((result) => {
            console.log('result', result)
        })



    client.close();

})