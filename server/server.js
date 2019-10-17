const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const accountsRouter = require('./routes/accountsRouter');
const petsRouter = require('./routes/petsRouter');
const vetsRouter = require('./routes/vetsRouter');
const visitsRouter = require('./routes/visitsRouter');
const surgeryRouter = require('./routes/surgeryRouter');
const vaccinesRouter = require('./routes/vaccinesRouter');
const sessionsController = require('./controllers/sessionsController');

const petsController = require('./controllers/petsController');
const accountsController = require('./controllers/accountsController');
const visitsController = require('./controllers/visitsController');
const surgeryController = require('./controllers/surgeryController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    console.log('this is inside upload', req.params);
    cb(null, `pet${req.params.petId}.png`);
  },
});


const upload = multer({ storage });


const app = express();

const PORT = 3000;

const mongoURI = 'mongodb+srv://teamUGG:uggly@petchart2-nvjty.mongodb.net/';
mongoose.connect(mongoURI, { dbName: 'petchart2' });

// db.query('SELECT * FROM pets', (err, res) => {
//   console.log('this is the db response: ', res.rows);
// });

app.use(bodyParser.json(), (req, res, next) => {
  console.log('\n*********** BodyParser JSON ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)}`);
  // eslint-disable-next-line max-len
  // console.log('\n*********** CookieParser ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nCOOKIES: ${JSON.stringify(req.cookies)}`);
  return next();
});

app.use(bodyParser.urlencoded(), (req, res, next) => {
  console.log('\n*********** BodyParser URL ENCODER ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nBODY: ${JSON.stringify(req.body)}`);
  // eslint-disable-next-line max-len
  // console.log('\n*********** CookieParser ****************', `\nMETHOD: ${req.method} \nENDPOINT: '${req.url}' \nCOOKIES: ${JSON.stringify(req.cookies)}`);
  return next();
});

app.use(cookieParser());

app.use('/accounts', accountsRouter);

app.use('/pets', petsRouter);

app.use('/vaccines', vaccinesRouter);

app.use('/vets', vetsRouter);

app.use('/visits', visitsRouter);

app.use('/surgeries', surgeryRouter);

app.use('/build', express.static(path.resolve(__dirname, '../build')));


app.post('/uploadImg/:petId', upload.single('avatar'), (req, res, next) => {
  res.redirect('/');
});

app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// app.get('/dummyAPI', (req, res) => {
//   console.log(res.headers);
// });

app.get('/plzwork',
  sessionsController.findSession,
  accountsController.getOwner,
  petsController.getPets,
  visitsController.getVisits,
  surgeryController.getSurgeries,
  (req, res) => {
    const { session } = res.headers;
    const { owner, pets, role } = res.locals;
    res.status(200).set({ session }).json({ owner, pets, role });
  });

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));


/**
 * @name GLOBAL ROUTE HANDLER
 * @description handles all bad request sent from frontend
 */
app.all('*', (req, res) => {
  res.status(404).send('Page not found assholes!');
});

/**
 * @name GLOBAL ERROR HANDLER
 * @description sending error objects from controllers/routes should be sent as an object with
 * 'status' and 'message' as key.
 * Status value should be a status code & message value should be a string describing the error
 * and location/file in which the error was invoked from
 */
app.use('/', (err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: 'express error caught unknown middleware error',
  };
  const newError = { ...defaultError, ...err };
  console.log('This is newError object: ', newError);
  console.log('This is global error handler: ', newError.message);
  res.status(newError.status).send(newError.message);
});

app.listen(PORT, () => console.log(`you are being heard on port ${PORT}`));
