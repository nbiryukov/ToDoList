var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.index = (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../' + '../' + '/public/index.html'));
};

module.exports.login = (req, res) => {
    var login = req.body.login;
    var password = req.body.password;
    User.findOne({ login: login, password: password }, (err, user) => {
        if (err) {
            console.log(err);
            res.json({
                ok: false,
                message: "запрос не прошел"
            });
        } else if (user != null) {
            console.log(user);
            res.json({
                ok: true,
                user: user
            });
        } else {
            res.json({
                ok: false,
                message: "неправильно введены данные"
            });
        }
    });
};

module.exports.registration = (req, res) => {
    var login = req.body.login;
    var password = req.body.password;
    User.findOne({ login: login }, (err, user) => {
        if (err) {
            console.log(err);
            res.json({
                ok: false,
                message: "запрос не прошел"
            });
        } else if (user != null) {
            res.json({
                ok: false,
                message: "такой пользователь уже существует"
            });
        } else {
            User.create({ login: login, password: password, todos: [] }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.json({
                        ok: false,
                        message: "запрос не прошел"
                    });
                } else if (user != null) {
                    res.json({
                        ok: true
                    });
                }
            });
        }
    });
};

module.exports.update = (req, res) => {
    var todos = req.body.todos;
    var login = req.body.login;
    User.updateOne({ login: login }, { todos: todos }, (err, doc) => {
        if (err) {
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