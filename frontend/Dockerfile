FROM node:20.18-bullseye-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1 \
    TAILWIND_DISABLE_LIGHTNINGCSS=1

ARG TARGETARCH
ARG TARGETOS

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN PLATFORM=$(node -p "process.platform") \
    && ARCH=$(node -p "process.arch") \
    && echo "Installing deps for $PLATFORM/$ARCH" \
    && npm_config_platform=$PLATFORM npm_config_arch=$ARCH npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN ARCH=$(node -p "process.arch") \
    && if [ "$ARCH" = "arm64" ]; then \
        npm_config_platform=linux npm_config_arch=arm64 npm install --no-save lightningcss-linux-arm64-gnu; \
       else \
        npm_config_platform=linux npm_config_arch=x64 npm install --no-save lightningcss-linux-x64-gnu; \
       fi
RUN PLATFORM=$(node -p "process.platform") \
    && ARCH=$(node -p "process.arch") \
    && npm_config_platform=$PLATFORM npm_config_arch=$ARCH npm run build

FROM base AS runner
WORKDIR /app
ENV PORT=3000 \
    NODE_ENV=production
EXPOSE 3000

# copiar apenas o necessário para rodar `next start`
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

CMD ["npm", "run", "start"]
