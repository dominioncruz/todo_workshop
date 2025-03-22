import { createTodoJoiSchema } from "./create_todo.dto";

export const updateTodoJoiSchema = createTodoJoiSchema.fork(
  Object.keys(createTodoJoiSchema.describe().keys),
  (schema) => schema.optional()
);
