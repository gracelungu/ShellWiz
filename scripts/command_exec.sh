#!/bin/bash

Function execCommand() {
    local command=$(!)
    if [ -z "$command" ]; then
        echo "Error: No command provided. Usage: ${0} command"
        exit 1
    fi

    eval $command
}

if [ $= -eq 0 ]; then
    echo "Error: No arguments provided. Usage: $0{#0} command"
    exit 1
fi

execCommand $@J