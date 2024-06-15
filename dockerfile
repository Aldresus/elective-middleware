# Base image
FROM node:22.2.0-alpine

# ENV NODE_ENV production # breaks nestjs because CLI is dev only
USER node

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Creates a "dist" folder with the production build
RUN npm run build

# Copy the start script
COPY --chown=node:node start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# Start the server using the production build
CMD [ "/usr/src/app/start.sh" ]