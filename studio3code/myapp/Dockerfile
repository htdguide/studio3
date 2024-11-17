FROM node:18-alpine

# Set working directory
WORKDIR /react-docker-example/

# Copy application files
COPY public/ /react-docker-example/public
COPY src/ /react-docker-example/src
COPY package.json /react-docker-example/

# Optimize npm for low memory usage
RUN npm set progress=false \
    && npm config set depth 0 \
    && npm install --legacy-peer-deps --no-audit

# Set the default command
CMD ["npm", "start"]
