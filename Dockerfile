FROM artifactory.cobalt.com/node8

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run-script build

WORKDIR /usr/src/app

USER default
EXPOSE 8080
CMD ["node", "server.js"]