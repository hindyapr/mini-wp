const mongoose = require('mongoose');
const Article = require('./article');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        validate: function(email) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{1,4})?$/;
            return emailRegex.test(this.email)
        }
    },
    password: {
        type: 'string',
        required: true
    },
    createdAt: 'date',
    updatedAt: 'date',
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

userSchema.pre("create", function(next) {
    this.password = bcrypt.hashSync(this.password, 9);
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User;