FROM node:14-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript (if applicable)
RUN npm run build

# Start a new stage for the runtime image
FROM node:14-alpine

# Create a non-root user with sudo privileges
RUN useradd -m apiuser && \
    echo "apiuser:apiuser" | chpasswd && \
    adduser apiuser sudo

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist /app

# Change ownership of the /app directory to the non-root user
RUN chown -R apiuser:apiuser /app

# Switch to the non-root user
USER apiuser

# Expose the API server port
EXPOSE 8080

# Run the API server as the non-root user
CMD ["node", "index.js"]
