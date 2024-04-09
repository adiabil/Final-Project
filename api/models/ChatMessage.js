import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
    user: {
        name: { type: String, required: true },
        image: { type: String, required: false }, // not required, assuming not all users may have an image
    },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;
