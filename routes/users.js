var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

module.exports = {
  url: 'mongodb+srv://admin1:admin123@cluster0.yr0dewl.mongodb.net/Casino?retryWrites=true&w=majority&appName=Cluster0',  
  options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
}; 