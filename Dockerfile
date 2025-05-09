FROM node:16-alpine
WORKDIR /app

# install netcat agar bisa wait-loop
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install 
COPY . .

EXPOSE 3000
# fallback jika entrypoint tidak override:
CMD ["npm", "run", "run dev"]
