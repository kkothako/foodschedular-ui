const express = require('express');

const app = express();

app.use(express.static('./dist/food-schedular-ui'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/food-schedular-ui/' }
  );
});
app.listen(process.env.PORT || 8080);
