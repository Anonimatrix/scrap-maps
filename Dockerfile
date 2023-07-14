FROM node:18.3.0-alpine3.14 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_ENV=production

RUN npm run build

CMD ["npm", "start"]