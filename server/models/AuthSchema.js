const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    token : { type: String },
    todo: [
        {
            todoId: { type: String, required: true },
            title: { type: String, required: true },
            desc: { type: String, required: true }
        }
    ]
})

module.exports = mongoose.model('Auth', AuthSchema)