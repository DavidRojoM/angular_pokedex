FROM nginx:1.21.1-alpine
COPY /dist/pokedex /usr/share/nginx/html
EXPOSE 80
