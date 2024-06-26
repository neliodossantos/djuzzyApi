const mongoose = require('mongoose');

const ContactNowSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    additionalInfo: { type: String }
}, { timestamps: true });  // Adiciona createdAt e updatedAt automaticamente

const Contact = mongoose.model('Contact', ContactNowSchema);

module.exports = {
    Contact
};
