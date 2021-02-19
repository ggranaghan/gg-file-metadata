var express = require('express');
var cors = require('cors');
require('dotenv').config()
const formidable = require('formidable')
const bodyParser = require('body-parser')
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', (req, res) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) console.error('Error', err)
    res.send({
      name: files.upfile.name,
      type: files.upfile.type,
      size: files.upfile.size
    })
  })
})




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
