# ==================================================
# Stage 1: build the app
# ==================================================
FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json* ./

# Install dependencies using cache
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy source code
COPY . .

# Build the app
RUN npm run build

# ==================================================
# Stage 2: serve the app
# ==================================================
FROM nginx:1.28-alpine AS runner

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy website
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

# Switch user
USER nginx

# Expose port
EXPOSE 8080

# Start Nginx
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]