FROM artifactory.cobalt.com/node8

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run-script build

WORKDIR /usr/src/app

USER default
EXPOSE 3000
CMD ["node", "server.js"]
#ADD package-lock.json /package-lock.json
#ADD package.json /package.json
#
#ENV NODE_PATH=/node_modules
#ENV PATH=$PATH:/node_modules/.bin
#RUN npm install
#
#WORKDIR /app
#ADD . /app
#
#EXPOSE 3000
#EXPOSE 35729
#
#ENTRYPOINT ["/bin/bash"]
#CMD ["start"]