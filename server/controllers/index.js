var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.index = (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../' + '../' + '/public/index.html'));
};

module.exports.login = (req, res) => {

};

module.exports.registration = (req, res) => {

};

module.exports.update = (req, res) => {
    var todos = req.body.todos;
    var login = req.body.login;
    User.updateOne({ login: login }, { todos: todos }, (err, doc) => {
        if (err) {
            console.log(err);
            res.json({
                ok: false
            });
        } else if (doc.nModified != 0) {
            console.log(doc);
            res.json({
                ok: true
            });
        }
    });
};