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

The plugin exposes a `POST /exec` endpoint that allows users to execute terminal commands and receive the results. The endpoint expects a request body with a `command` property, executes the command using the `child_process` module, and returns the `stdout` and `stderr` results.

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

## Running Tests

To run the tests for the Command Executor plugin, use the following command:

```
npm test
```

This will run the test suite and display the results.

## Contact

For support or inquiries, please contact: support@ShellWiz.vercel.app
