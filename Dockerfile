FROM node:12.18-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx:1.19.10-alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/curso-fullstack-angular-spring-frontend /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
