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
COPY store.js ./store.js
COPY tailwind.config.js ./tailwind.config.js
COPY postcss.config.js ./postcss.config.js
CMD ["npm", "run", "dev"]

