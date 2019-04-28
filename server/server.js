const { mongoose } = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');

const { ObjectID } = require('mongodb')

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


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e)
    })
});

// GET todos/ObjectID

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send({})
        return console.log('Id is invalid');
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send({})
            return console.log('Todo not found');
        }

        res.send({ todo })
    }, (error) => {
        console.log('error: ', error)
        res.status(400).send({})

    })
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send({})
    }

    Todo.findByIdAndRemove(id).then(todo => {
        if (!todo) {
            res.status(404).send()
        }
        res.status(200).send({ todo })
    }).catch(e => res.status(400).send())

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));

module.exports = {
    app
}
