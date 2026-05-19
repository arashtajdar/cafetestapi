# Use official Node.js runtime as the base image
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package configuration files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source files
COPY . .

# Expose the default port specified in the application
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Command to start the application
CMD [ "npm", "start" ]
