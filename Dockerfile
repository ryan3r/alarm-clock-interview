FROM node:8.11 AS build

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm build

FROM node:8.11

WORKDIR /app

COPY package*.json ./
RUN npm i --production

COPY . .
COPY --from=build /app/build/static public

CMD ["npm", "start"]