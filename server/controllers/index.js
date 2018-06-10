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

};