FROM node:20-alpine as frontend

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=frontend  /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]