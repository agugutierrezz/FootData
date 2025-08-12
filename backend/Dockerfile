FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=deps /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=deps /app ./
EXPOSE 3000
CMD ["npm", "start"]
