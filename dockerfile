FROM node:18.13.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install 

RUN npm install -g @angular/cli@14.0.0

COPY . .

CMD ng serve --host 0.0.0.0 --port 4200

EXPOSE 4200