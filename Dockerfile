FROM node:12

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

# RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production
RUN npm ci --only=production

RUN npm run build

RUN npm run heroku-postbuild


# копируем исходный код
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
