var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    id: Number,
    done: Boolean,
    task: String
});

var userSchema = new mongoose.Schema({
    login: String,
    password: String,
    todos: [taskSchema]
});

mongoose.model('User', userSchema);