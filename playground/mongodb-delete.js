const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connect to MongoDB server ');

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({ text: 'Nothing to do' }).then((result) => {
    //     console.log('result', result);
    // });

    // db.collection('Todos').deleteOne({ text: 'Something to do' }).then((result) => {
    //     console.log('result', result);
    // });

    // db.collection('Todos').findOneAndDelete({ text: 'Something to do' }).then((result) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(result.value, null, 2));
    // });

    // db.collection('Users').deleteMany({ name: 'Joe' }).then((result) => {
    //     console.log('result', result)
    //     console.log('deleteCount: ', result.deletedCount)
    // })

    db.collection('Users').findOneAndDelete({ _id: ObjectID("5cc458c2f40d97c3abaf048b") }).then((result) => {
        console.log('result', result.value)
    })

    client.close();

})