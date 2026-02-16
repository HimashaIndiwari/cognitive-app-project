const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'caregiver'], default: 'user' }, //
  levels: {
    memory: { type: Number, default: 3 }, // [cite: 7-9]
    mobility: { type: Number, default: 3 }, // [cite: 13-15]
    social: { type: Number, default: 3 }, // [cite: 57-59]
    attention: { type: Number, default: 3 }
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', UserSchema);