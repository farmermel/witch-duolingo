const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Translate} = require("@google-cloud/translate").v2;


const environment = process.env.NODE_ENV || 'development';

// TODO: break out into seperate files

console.log('environment', environment)
// Creates a client
let translate;
if (environment === 'development' || environment === 'test') {
  translate =  'This is gonna blow up';
} else {
  translate = new Translate();
}

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

  app.get('/latin/:text', async (req, resp) => {
    try {
      const translation = await translateText(req.params.text)
      resp.status(200).json(translation)
    } catch (err) {
        console.log("api not available, falling back to fake answers")
        resp.status(200).json(['["Salve", "Vale", "Bonum mane", "Bonum vesperam", "Dea sit apud vos", "Vos noscere", "Veniam in me", "Nomen gerens Ariadna furores", "Di tibi male faciant", "Meum nomen est"]'])
      }
    }
  )

  async function translateText(text) {
    let [translations] = await translate.translate(text, "la");
    translations = Array.isArray(translations) ? translations : [translations];
    return translations;
  }

  module.exports = app;