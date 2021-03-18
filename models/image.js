var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    sessionid: String
});

const Image = new mongoose.model('Image', imageSchema)
 
//Image is a model which has a schema imageSchema
 
module.exports = {Image};