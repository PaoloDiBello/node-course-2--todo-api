const mongoose = require('mongoose');

//To use native promises
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
}

