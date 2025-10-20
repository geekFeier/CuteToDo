import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  premium: {
    type: Boolean,
    default: false
  },
  premiumActivatedAt: {
    type: Number,
    default: null
  },
  updatedAt: {
    type: Number,
    default: () => Date.now()
  }
});

const Config = mongoose.model('Config', configSchema);

export default Config;

