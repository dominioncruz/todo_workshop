import type { NextFunction, Request, Response } from "express";
import Todo from "../model/todo.model";
import { StatusCodes } from "http-status-codes";
import { createTodoJoiSchema } from "../dtos/todo/create_todo.dto.ts";
import { BadRequest, RequestNotFound } from "../errors";
import { updateTodoJoiSchema } from "../dtos/todo/update_todo.dto.ts";

export const getAllTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.status(StatusCodes.OK).json(todos);
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = createTodoJoiSchema.validate(req.body);

    if (error) throw new BadRequest(error.message);

    const newTodo = new Todo(value);

    await newTodo.save();

    res.status(StatusCodes.CREATED).json(newTodo);
  } catch (error) {
    next(error);
  }
};
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = updateTodoJoiSchema.validate(req.body);

    if (error) throw new BadRequest(error.message);

    const updatedTodo = await Todo.findByIdAndUpdate(req.params._id, value, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) throw new RequestNotFound("Todo not found");

    res.status(StatusCodes.OK).json({
      message: `Todo with id ${updatedTodo._id} updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params._id, {
      new: true,
      runValidators: true,
    });

    if (!deletedTodo) throw new RequestNotFound("Todo not found");

    res.status(StatusCodes.OK).json({
      message: `Todo with id ${deletedTodo._id} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
