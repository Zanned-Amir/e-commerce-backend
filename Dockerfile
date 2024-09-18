# Use official Node.js image as a base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon and ts-node globally for dev environment
RUN npm install -g nodemon ts-node

# Copy the rest of the application
COPY . .

# Copy env-dev file to the container and rename it to .env
COPY .env-dev .env



# Add the private key and public key to the .env file


# Expose the port the app runs on
EXPOSE 3000

# Start the application using the start:dev command
CMD ["npm", "run", "start:dev"]
