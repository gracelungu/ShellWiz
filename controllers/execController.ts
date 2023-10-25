import { Request, Response } from "express";
import { execFile } from "child_process";

// Type definition for the request body of the /exec endpoint
interface ExecRequestBody {
  command: string;
}

// Execute terminal commands
export const executeCommand = (req: Request, res: Response) => {
  const { command } = req.body as ExecRequestBody;
  const workingDir = process.env.WORKING_DIR || ".";
  const shellScript = `/path/to/shell/script.sh`;
  execFile(shellScript, [command], { cwd: workingDir }, (error: unknown, stdout: string, stderr: string) => {
    if (error) {
      console.error(`exec error: ${error}`);
      // Send the full error message along with stderr
      res.status(500).send({ error: error.toString(), stderr });
      return;
    }
    res.send({ stdout, stderr });
  });
};
