FROM node

WORKDIR /app

COPY . .

RUN npm install -g npm@10.2.5

RUN npm i

RUN npm run build

CMD [ "npx","prisma", "migrate", "dev", "--name", "users", "npm", "start" ]