FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5555

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]