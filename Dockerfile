FROM node:14

# Create a non-root user with sudo privileges
RUN useradd -m apiuser && \
    echo "apiuser:apiuser" | chpasswd && \
    adduser apiuser sudo

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Change ownership of the /app directory to the non-root user
RUN chown -R apiuser:apiuser /app

# Switch to the non-root user
USER apiuser

# Expose the API server port
EXPOSE 8080

# Run the API server as the non-root user
CMD ["node", "index.js"]
