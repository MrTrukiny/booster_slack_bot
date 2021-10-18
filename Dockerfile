FROM public.ecr.aws/lambda/nodejs:14

COPY package*.json /var/task/

RUN npm ci --production

COPY . /var/task/

CMD [ "app.boosterBot" ]
