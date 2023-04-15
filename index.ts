import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { exec } from "child_process";

export const app = express();
app.use(cors());
app.use(express.json());

// Serve ai-plugin.json at the root
app.use(express.static(path.join(__dirname, "/")));

// Serve spec.yaml at the root
app.use("/spec", express.static(path.join(__dirname, "spec.yaml")));

// Type definition for the request body of the /exec endpoint
interface ExecRequestBody {
  command: string;
}

// Execute terminal commands
app.post("/exec", (req: Request, res: Response) => {
  const { command } = req.body as ExecRequestBody;
  exec(command, (error: unknown, stdout: string, stderr: string) => {
    if (error) {
      console.error(`exec error: ${error}`);
      // Send the full error message along with stderr
      res.status(500).send({ error: error.toString(), stderr });
      return;
    }
    res.send({ stdout, stderr });
  });
});

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
