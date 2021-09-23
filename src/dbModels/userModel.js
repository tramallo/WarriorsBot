const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        id: {type: String, required: true}
    },
    { collection: 'users'}
)

module.exports = mongoose.model('Users', userSchema)