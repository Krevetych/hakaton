FROM node:22-alpine

RUN apk add --no-cache pnpm

WORKDIR /app
COPY . .

RUN pnpm install

RUN pnpm build

CMD ["pnpm", "start"]