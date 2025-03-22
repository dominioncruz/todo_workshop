import Joi from "joi";

export const createTodoJoiSchema = Joi.object({
  content: Joi.string().required(),
  completed: Joi.boolean().default(false),
});
