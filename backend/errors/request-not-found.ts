import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class RequestNotFound extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export default RequestNotFound;
