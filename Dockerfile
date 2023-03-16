FROM node:alpine

WORKDIR /usr/src/bango

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]