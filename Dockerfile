# -------- Build --------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -------- Nginx --------
FROM nginx:alpine

# Config SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Archivos build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# cache-bust: 1774893806
