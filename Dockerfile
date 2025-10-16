FROM node:18

WORKDIR /app

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y chromium

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium

CMD ["npm", "start"]
