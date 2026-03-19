const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: String,
    description: String,
    image: String,
    slug: String,
});

module.exports = mongoose.model('Course', CourseSchema);