import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});
const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
