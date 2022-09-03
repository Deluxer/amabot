FROM node:18-alpine3.15

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g @nestjs/cli

RUN npm install --force --omit=dev

COPY . .

RUN npm run build

CMD [ "npm","start" ]