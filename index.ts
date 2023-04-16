import express from "express";
import cors from "cors";
import path from "path";
import dotenv from 'dotenv';
import { executeCommand } from "./controllers/execController";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

// Serve ai-plugin.json at the root
app.use(express.static(path.join(__dirname, "/")));

// Serve spec.yaml at the root
app.use("/spec", express.static(path.join(__dirname, "spec.yaml")));

// Route to execute terminal commands
app.post("/exec", executeCommand);

// Define the starting port number
const START_PORT = process.env.PORT ? parseInt(process.env.PORT) : 9001;

// Define a maximum number of retries
const MAX_RETRIES = 10;

// Function to start the server on a given port
function startServer(port: number, retries: number) {
  // If we've exceeded the maximum number of retries, give up
  if (retries > MAX_RETRIES) {
    console.log('Unable to find an available port. Exiting...');
    return;
  }

  // Attempt to start the server on the specified port
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (error: any) => {
    // If the error code is EADDRINUSE, it means the port is already in use
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use. Trying next port...`);
      // Increment the port number and try again
      startServer(port + 1, retries + 1);
    } else {
      // If it's a different error, log it and exit
      console.error(error);
      process.exit(1);
    }
  });

  return server;
}

// Start the server with the initial port and 0 retries
const serverInstance = startServer(START_PORT, 0);

// Export the server instance
export { serverInstance };
