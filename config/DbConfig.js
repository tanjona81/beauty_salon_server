const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/beauty';
const uriProd = 'mongodb+srv://trajoelison81:nrr26l6BwBibfIFN@cluster0.uh1an0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

module.exports = mongoose.connect(uri);