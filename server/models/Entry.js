import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    profit: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Entry', EntrySchema);
