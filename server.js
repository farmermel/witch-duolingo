const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Translate} = require("@google-cloud/translate").v2;

// TODO: break out into seperate files

// Creates a client
const translate = new Translate();

const environment = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 8081);
app.use(bodyParser.json());

app.enable('trust proxy');

app.use((req, res, next) => {
    if (req.secure || environment !== 'production') {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`)
  });

  app.get('/latin/:text', (req, resp) => {
    async function translateText() {
      let translations = await translate.translate(req.params.text, "la");
      return translations;
    }
 
    translateText().then((translation) => {
      resp.status(200).json(translation)
    }).catch(error => {
      resp.status(500).json({error})
    })
  })

  module.exports = app;