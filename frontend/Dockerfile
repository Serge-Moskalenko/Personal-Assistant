
FROM node:22-alpine AS builder

WORKDIR /app


COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile


COPY . .
RUN yarn build


FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
RUN yarn install --production --frozen-lockfile


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["yarn", "start"]
