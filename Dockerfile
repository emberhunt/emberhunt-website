### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY emberhunt/package.json emberhunt/package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY emberhunt .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm run ng build -- --prod --output-path=dist


### STAGE 2: Node Server ####

FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --from=builder /ng-app/dist ./public

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
