FROM node:17.0.0
WORKDIR /home/node
COPY ./ ./
WORKDIR /home/node/app
RUN npm install
RUN npm run build
WORKDIR /home/node/api
RUN npm install
RUN npm run build
RUN mv /home/node/app/build dist/src/build
EXPOSE 3001
#Launch the node command externally from npm to prevent him swallowing logs
CMD ["node", "dist/src/server.js"]