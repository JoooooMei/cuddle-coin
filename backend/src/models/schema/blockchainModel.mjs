import mongoose from 'mongoose';

const blockchainSchema = new mongoose.Schema({
  timestamp: Number,
  hash: String,
  lastHash: String,
  data: Array,
  nounce: Number,
  difficulty: Number,
});

export default mongoose.model('Blockchain', blockchainSchema);
