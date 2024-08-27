FROM node:latest as build-stage

WORKDIR /InvoiceVerification

COPY public/ /InvoiceVerification/public
COPY src/ /InvoiceVerification/src
COPY package.json /InvoiceVerification/
RUN npm install
CMD ["npm", "start"]
