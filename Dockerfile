FROM node:latest as build-stage

WORKDIR /InvoiceVerification

COPY public/ /InvoiceVerification/public
COPY src/ /InvoiceVerification/src
COPY package.json /InvoiceVerification/package.json
COPY .next /InvoiceVerification/.next
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
