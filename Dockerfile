# Multi-stage build: build React app then serve with Nginx

# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev=false
COPY . .
RUN npm run build

# 2) Runtime stage
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["nginx","-g","daemon off;"]


