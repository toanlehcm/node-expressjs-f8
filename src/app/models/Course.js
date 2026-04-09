const mongoose = require('mongoose');
const mongooseSlug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255, required: true },
    level: { type: String, maxLength: 255 },
    slug: { type: String, unique: true, slug: 'name' },
    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },
}, { timestamps: true });

mongoose.plugin(mongooseSlug);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', CourseSchema);