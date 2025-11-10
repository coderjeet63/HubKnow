# --- Stage 1: Build ---
# Use Node.js 18 to build the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the static files
# Note: Ensure your .env.production.local has the correct API_URL
RUN npm run build

# --- Stage 2: Serve ---
# Use a lightweight Nginx server to serve the static files
FROM nginx:1.25-alpine

# Copy the built files from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (optional but good practice)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx default)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]