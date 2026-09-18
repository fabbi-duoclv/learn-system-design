# FROM node:20 AS Build

# WORKDIR /app

# COPY ./app .

# RUN npm ci --omit=dev && npm run build

# FROM nginx:1.25-alpine

# COPY --from=build /app/out /usr/share/nginx/html

# -----------------------------------------------------------

FROM node:20

WORKDIR /app

COPY . .

RUN npm ci && npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]