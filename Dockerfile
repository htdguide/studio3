# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /react-docker-example/

# Copy the contents of the GitHub repository directly into the container
RUN apk add --no-cache git \
    && git clone https://github.com/username/repository.git .  # Cloning the repo directly into the working directory

# Install application dependencies
RUN npm set progress=false \
    && npm config set depth 0 \
    && npm install --legacy-peer-deps --no-audit

# Set the default command
CMD ["npm", "start"]
