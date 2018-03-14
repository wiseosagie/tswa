import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let tswaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tswa', tswaSchema);
