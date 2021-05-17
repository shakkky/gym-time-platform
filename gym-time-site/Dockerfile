FROM node:11-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the Gym Time frontend react app."
LABEL maintainer = ["shakeel.mohammed1@hotmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]