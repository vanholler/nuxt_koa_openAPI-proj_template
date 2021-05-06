FROM node:12.16.2

ENV WORKDIR=/app
RUN mkdir -p ${WORKDIR}

COPY ./ ${WORKDIR}

WORKDIR ${WORKDIR}
RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
