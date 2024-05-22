# Dockerfile

FROM node:14-alpine

# Install bash, curl, and iputils (for ping)
RUN apk update && apk add bash curl iputils

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY src /src

EXPOSE 3000

CMD ["node", "index.js"]
