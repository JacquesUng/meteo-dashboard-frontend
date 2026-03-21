# ==================================================
# Stage 1: build the app
# ==================================================
FROM dhi.io/node:24-alpine3.22-dev AS builder

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
FROM dhi.io/nginx:1.28.0-alpine3.21-dev AS runner

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