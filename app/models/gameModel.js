var mongoose = require('mongoose');

module.exports = mongoose.model('Game', {
    text: {
        type: String,
        default: ''
    }
});