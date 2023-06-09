# ShellWiz

## Overview

The Command Executor is a plugin for executing shell commands on a remote server and returning the output. It supports a variety of commands commonly used in software development and is intended to be used by chatGPT to perform tasks that can be done through the terminal. The plugin uses intelligent string handling to prevent string escape errors and ensure a seamless user experience.

## Installation

To install the Command Executor plugin, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/gracelungu/ShellWiz.git
   ```

2. Change to the project directory:
   ```
   cd ShellWiz
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```

The server will start running on the specified port (default is 9001).

## Features

- Execute shell commands on a remote server
- Supports a variety of commands commonly used in software development
- Returns the output of the executed command
- Prevents string escape errors

## API

The plugin exposes the following endpoints:

### POST /exec

Execute a terminal command and receive the results.

- Request Body:
- `command`: The command to be executed in the terminal (string).

- Response:
- `stdout`: The standard output of the executed command.
- `stderr`: The standard error output of the executed command.

## Usage

To execute a command, send a POST request to the `/exec` endpoint with the command to be executed in the request body:

```
POST /exec
{
  "command": "echo 'Hello, World!'"
}
```

The response will contain the `stdout` and `stderr` results of the executed command:

```
{
  "stdout": "Hello, World!\n",
  "stderr": ""
}
```

## Working Directory Feature

### Overview

The "Working Directory" feature allows you to specify a default directory in which all shell commands will be executed. This is useful for cases where you want to consistently execute commands within a specific directory.

### Configuration

To configure the working directory, you need to set the `WORKING_DIR` environment variable to the desired directory path. You can do this by adding the following line to your `.env` file:

```
WORKING_DIR=/path/to/working/directory
```

Replace `/path/to/working/directory` with the actual path to the directory you want to use as the working directory. Once the `WORKING_DIR` environment variable is set, the application will automatically change to this directory before executing any shell commands.


## Running Tests

To run the tests for the Command Executor plugin, use the following command:

```
npm test
```

This will run the test suite and display the results.

## Contact

For support or inquiries, please contact: support@ShellWiz.vercel.app
