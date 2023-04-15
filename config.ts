import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
export const START_PORT = process.env.PORT ? parseInt(process.env.PORT) : 9001;
export const MAX_RETRIES = 10;
