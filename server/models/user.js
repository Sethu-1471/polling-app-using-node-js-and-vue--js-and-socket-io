const moongose = require('mongoose')

const UseSchema = new moongose.Schema({
    phone: String,
    otp: String
}, {timestamps: true} )

module.exports = moongose.model('User', UseSchema)