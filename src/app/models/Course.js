const mongoose = require('mongoose');
const mongooseSlug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

// 1. Tạo Schema cho bộ đếm (Tự làm thay cho mongoose-sequence)
const CounterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', CounterSchema, 'counters');

const CourseSchema = new Schema({
    _id: { type: Number },
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255, required: true },
    level: { type: String, maxLength: 255 },
    slug: { type: String, unique: true, slug: 'name' },
}, { 
    _id: false, // turn off _id, mongoose do not interfere with this field.
    timestamps: true // turn on createdAt and updatedAt
});

// 2. Custom pre-save hook tự động tăng _id
CourseSchema.pre('save', async function (next) {
    if (!this.isNew) return next(); // Chỉ tăng khi tạo mới
    
    try {
        const counter = await Counter.findByIdAndUpdate(
            'course_id', // ID của bộ đếm khóa học
            { $inc: { seq: 1 } }, // Tăng lên 1
            { new: true, upsert: true } // Nếu chưa có thì tạo mới (upsert)
        );
        this._id = counter.seq;
        next();
    } catch (error) {
        next(error);
    }
});

mongoose.plugin(mongooseSlug);

// Đã bỏ CourseSchema.plugin(AutoIncrement...);
CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true, // add deletedAt field to the model.
    overrideMethods: 'all' // override all methods to use soft delete.
});

module.exports = mongoose.model('Course', CourseSchema);