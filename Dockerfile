FROM node:lts-alpine

ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /home/node
USER node

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

COPY . ./

EXPOSE ${PORT}

CMD ["npm", "run", "app" ]