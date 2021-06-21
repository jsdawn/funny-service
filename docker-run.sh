docker stop funny-node
docker rm funny-node

docker pull registry.cn-shenzhen.aliyuncs.com/jsdawn/funny-node:1.0
docker run -d -p 3000:3000 --name=funny-node registry.cn-shenzhen.aliyuncs.com/jsdawn/funny-node:1.0