#!/bin/bash

# Path to the default env file
DEFAULT_ENV_FILE=".default.env"

# Path to the new env file
NEW_ENV_FILE=".env"

# Check if the default env file exists
if [ ! -f "$DEFAULT_ENV_FILE" ]; then
    echo "Default env file not found: $DEFAULT_ENV_FILE"
    exit 1
fi

# Copy the content from default env file to new env file
cp "$DEFAULT_ENV_FILE" "$NEW_ENV_FILE"

echo ".env file created/updated successfully from $DEFAULT_ENV_FILE"

