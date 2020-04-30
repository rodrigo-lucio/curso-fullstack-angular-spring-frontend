const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

//Todos as urls batem para o index
app.get('/*', function(req, res){
  res.sendfile(__dirname + '/dist/index.html');
});

app.listen(process.env.port || 4200);
