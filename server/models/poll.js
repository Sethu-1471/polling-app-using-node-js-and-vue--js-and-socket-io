const moongose = require('mongoose')

const UseSchema = new moongose.Schema({
    question: String,
    options: [String],
    voters: [String],
    vote_count: [Number],
    end: String
}, { timestamps: true });

module.exports = moongose.model('Poll', UseSchema)