const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/beauty';

module.exports = mongoose.connect(uri);