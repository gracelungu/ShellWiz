import subprocess

def test_command_execution():
    # Run the shell script with a sample command
    result = subprocess.run(['./scripts/command_exec.sh', 'echo Hello World'], capture_output=True, text=True)
    assert result.stdout.strip() == 'Hello World'
