FROM node:12.1
LABEL maintainer="kingwyh1993@163.com"
COPY . /home/funnyService
WORKDIR /home/funnyService
ENV NODE_ENV=production
RUN npm install yarn -g
RUN yarn install
EXPOSE 3000
CMD [ "node", "src/app.js" ]