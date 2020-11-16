const express = require('express');
const app = express();

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static('dist'));
const listener = app.listen(8080, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
