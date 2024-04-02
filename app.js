require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const loginRoutes = require('./routes/loginRoutes');
const subscribeRoutes = require('./routes/subscriberoute');
const swaggerConfig = require('./routes/swaggerConfig');
const getUserDetails = require('./routes/loginRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// const multer = require('multer');

// const upload = multer({
//   limits: { fileSize: 100 * 1024 * 1024 } // 100MB
// });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected Aman'))
  .catch(err => console.error('MongoDB Connection Error: ', err));

// Middleware setup
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '100mb' })); // Parse JSON bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Swagger Configuration
app.use('/', swaggerConfig);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRouter);
app.use('/auth', loginRoutes);
app.use('/subscribe', subscribeRoutes);
app.post('/user', getUserDetails);

app.post("/user",async(req,res) => {
  const {base64}=req.body;
  try{
    Images.create({image:base64});
    res.send({Status:"ok"})
  } catch (error){
    res.send({Status:"error",data:error});
  }
})

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  console.error(err.stack); // Log the error
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
