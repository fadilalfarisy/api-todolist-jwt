import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['on progress', 'done']
    },
    description: String,
    image: String,
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo