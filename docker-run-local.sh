docker stop funny-node
docker rm funny-node

docker run -d -p 3000:3000 --name=funny-node funny-node:1.0