FROM node:Latest
#ENV NODE_ENV production
# создание директории приложения
WORKDIR ./

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./dist

RUN npm install --production
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production
# RUN npm ci --only=production

RUN npm run build

# копируем исходный код
COPY dist ./dist

EXPOSE 8080
CMD [ "npm", "run", "start" ]
