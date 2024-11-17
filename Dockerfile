# First stage: Build the application from the GitHub repository
FROM node:18-alpine as build

# Set working directory
WORKDIR /react-docker-example/

# Clone the GitHub repository and install dependencies
RUN apk add --no-cache git \
    && git clone https://github.com/htdguide/studio3.git .  # Replace with the actual GitHub repository URL

# Install dependencies
RUN npm set progress=false \
    && npm config set depth 0 \
    && npm install --legacy-peer-deps --no-audit

# Second stage: Copy only necessary files to the final image
FROM node:18-alpine

# Set working directory for the final image
WORKDIR /react-docker-example/

# Copy files from the build stage
COPY --from=build /react-docker-example /react-docker-example

# Set the default command
CMD ["npm", "start"]
