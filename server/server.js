const { mongoose } = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.status(200).send(doc)
    }, (e) => {
        //console.log('error: ', e)
        res.status(400).send(e);
    })

    // console.log(req.body);
});

// GET todos/ObjectID

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e)
    })
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));

module.exports = {
    app
}
