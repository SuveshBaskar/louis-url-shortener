FROM node
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8989

CMD [ "node", "app.js" ]