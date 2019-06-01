const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const graphQLHttp = require('express-graphql');
const isAuth = require('./middleware/is-auth');

const allSchemas = require('./schema/schema');
const allResolvers = require('./resolvers/allResolvers');
const compression = require('compression');

const PDFdocument = require('pdfkit');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.post('/create-pdf', (req, res) => {
  const inVoiceName = req.body.orderId + '.pdf';
  const invoicePath = path.join(__dirname, 'PDFdocument', inVoiceName);
  const pdfDoc = new PDFdocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="'+ inVoiceName +'"');
  pdfDoc.pipe(fs.createWriteStream(invoicePath));
  pdfDoc.pipe(res);
  pdfDoc.fontSize(29).text('Bus Ticket', {
    underline: true,
    align: 'center',
    lineGap: 40
  });
  pdfDoc.fontSize(20).text(`Full Name: ${req.body.fullName}`, {
    align: 'left',
    lineGap: 10
  });
  pdfDoc.fontSize(20).text(`Seats: ${req.body.seats}`, {
    align: 'left',
    lineGap: 10
  });
  pdfDoc.fontSize(20).text(`Ticket ID: ${req.body.orderId}`, {
    align: 'left',
    lineGap: 10
  });
  pdfDoc.fontSize(20).text(`Date: ${req.body.dateFrom}`, {
    align: 'left',
    lineGap: 10
  });
  pdfDoc.fontSize(20).text(`Departure Time: ${req.body.depTime}`, {
    align: 'left',
    lineGap: 10
  });
  pdfDoc.fillColor('red').fontSize(17).text('@bus-ticket.com', {
    align: 'center'
  })
  pdfDoc.end();
});
app.use('/graphql', graphQLHttp({
  schema: allSchemas,
  rootValue: allResolvers,
  graphiql: true
}));

app.get('/*', (req, res, next) => {
  res.sendFile(express.static(path.join(__dirname, 'angular', 'index.html')));
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1-tmn4p.mongodb.net/${process.env.MONGO_DATABASE}`).then(res => {
  const server = app.listen(process.env.PORT || 8080);
  const io = require('../socket.js').init(server);
  io.on('connection', socket => {
    console.log('connected');
  });
})
.catch(err => {
  console.log(err);
  throw new Error(err);
});

module.exports = app;
