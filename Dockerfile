FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nest/cli

RUN npm i

COPY . .

COPY ./dist ./dist

CMD [ "npm", "run", "start:dev" ]