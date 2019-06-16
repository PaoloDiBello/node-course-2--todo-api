require('./config/config')
const _ = require('lodash')
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');

const { ObjectID } = require('mongodb')

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { authenticate } = require('./middleware/authenticate')

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        console.log('doc', doc)
        res.status(200).send(doc);
    }).catch(e => {
        res.status(400).send(e);
    })

});

app.get('/todos', authenticate, (req, res) => {
    Todo.find(
        { _creator: req.user._id }
    ).then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e)
    })
});

// GET todos/ObjectID

app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(404).send({})
        return console.log('Id is invalid');
    }

    Todo.findOne(
        {
            _id: id,
            _creator: req.user._id
        }
    ).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send({})
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then(todo => {
        if (!todo) {
            res.status(404).send()
        }
        res.status(200).send({ todo })
    }).catch(e => res.status(400).send())

});

app.put('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params
    if (!ObjectID.isValid(id)) {
        res.status(404).send({})
    }
    const body = _.pick(req.body, ['text', 'completed'])

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({ todo })
    }).catch(e => { res.status(400).send() })
});


const PORT = process.env.PORT;


// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })

    }).catch((e) => {
        res.status(400).send();
    });
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
})

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));


module.exports = {
    app
}
