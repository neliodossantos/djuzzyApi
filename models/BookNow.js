const mongoose = require('mongoose');

const BookNowSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    prefix: { type: String },
    website: { type: String },
    genre: { type: String },
    songs: { type: String },
    details: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    band: { type: String },
    sessionMusicians: { type: String },
    additionalInfo: { type: String }
});

const Booknow = mongoose.model('Booknow', BookNowSchema);

module.exports = {
    Booknow
};
