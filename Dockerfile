FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY next.config.js ./next.config.js
COPY actions ./actions
COPY components ./components
COPY constants ./constants
COPY pages ./pages
COPY public ./public
COPY reducers ./reducers
COPY screens ./screens
COPY styles ./styles

CMD ["npm", "dev"]

