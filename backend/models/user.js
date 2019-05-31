const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdRoutes: [{
    type: Schema.Types.ObjectId,
    ref: 'Route'
  }]
});

module.exports = mongoose.model('Admin', userSchema);
