const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

var _id = '5cc5c69a8ae30c5a18bf05b0';

// Todo.findOneAndRemove({ _id }).then((todo) => {
//     console.log('todo', todo)
// })

Todo.findByIdAndRemove(id).then((todo) => {
    console.log('todo', todo)
})


