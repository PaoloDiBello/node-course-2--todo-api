const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');

var id = '5cc5a25fa3fd995b20134d60';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo)
// }, e => console.log('error', e))

const userId = '5cc47d408dc85463cccc38f0';

User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log('User', user)
}, e => console.log('error', e))
