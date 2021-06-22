FROM node:12.1
LABEL maintainer="kingwyh1993@163.com"
COPY . /home/funnyService
WORKDIR /home/funnyService
RUN npm install yarn -g
RUN yarn install
EXPOSE 3000
CMD [ "yarn", "run", "startpro" ]