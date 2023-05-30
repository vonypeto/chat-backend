# ;-------------;
# ; Build stage ;
# ;-------------;
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD ["npm","start"]
# RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store \
#     pnpm install --frozen-lockfile && \
#     pnpm build

# # ;---------------;
# # ; Runtime stage ;
# # ;---------------;
# FROM nginx:stable-alpine as runtime

# COPY --from=builder /app/dist/angular-boilerplate /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
