FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
# RUN npm run build

RUN npm run lint
EXPOSE 8080
CMD [ "npm", "run", "serve" ]