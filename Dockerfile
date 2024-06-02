# Stage 1: Build the Node.js application
FROM node:17-alpine as builder

# Set the working directory for the build stage
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies using npm
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application using Nginx
FROM nginx:1.19.0

# Set the working directory for the Nginx server
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy the built application from the build stage to the Nginx server's root directory
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80

# Start the Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
