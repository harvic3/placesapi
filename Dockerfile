FROM node:12.18.3-buster

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

WORKDIR /usr/node/app

COPY package*.json ./

RUN npm ci

ADD . /usr/node/app

RUN npm run build

#EXPOSE 2020/tcp

#CMD [ "node", "dist/index" ]
