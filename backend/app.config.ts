import dotenv from "dotenv";

//For env File
dotenv.config();

export const host = process.env.HOST as string;
export const port = parseInt(process.env.PORT as string);
export const mongo_uri = process.env.MONGO_URI as string;
