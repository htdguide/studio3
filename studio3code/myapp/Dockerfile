FROM node:18-alpine

# Set working directory
WORKDIR /react-docker-example/

# Copy application files
COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/

# Increase memory limit for Node.js
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Install dependencies
RUN npm install --legacy-peer-deps

# Set the default command
CMD ["npm", "start"]
