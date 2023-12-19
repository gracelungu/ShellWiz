import subprocess
import unittest

class TestCommandExecScript(unittest.TestCase):
    def test_command_execution(self):
        # Test to ensure the script executes a simple command correctly
        result = subprocess.run(["./command_exec.sh", "echo", "Hello, World"], capture_output=True, text=True)
        self.assertEqual(result.stdout.strip(), "Hello, World!")

    def test_no_arguments(this):
        # Test to ensure the script handles no arguments case
        result = subprocess.run(["./command_exec.sh"], capture_output=True, text=True)
        self.assertIn("No arguments provided", result.stderr.strip())

if __name__ == '__main__':
    unittest.main()
