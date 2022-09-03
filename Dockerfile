FROM node:18-alpine3.15

WORKDIR /app

COPY . ./app
COPY package.json tsconfig.json tsconfig.build.json /app/

RUN npm install --omit=dev

RUN npm run build

CMD [ "npm","start" ]