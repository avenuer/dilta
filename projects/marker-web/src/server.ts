import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';

import { join } from 'path';

enableProdMode();

export const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DIST_FOLDER = join(process.cwd(), 'dist', 'marker-web');
const VIEWS_FOLDER = join(DIST_FOLDER, 'browser');

const x = require('./dist/marker-web/server/main');
const {
  AppServerModule,
  LAZY_MODULE_MAP
} = require('../../../dist/marker-web/server/main');
console.log(x, new AppServerModule());

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', VIEWS_FOLDER);

app.get('/redirect/**', (req, res) => {
  const location = req.url.substring(10);
  res.redirect(301, location);
});

app.get(
  '*.*',
  express.static(VIEWS_FOLDER, {
    maxAge: '1y'
  })
);

app.get('/*', (req, res) => {
  res.render('index', { req, res }, (err, html) => {
    if (html) {
      res.send(html);
    } else {
      console.error(err);
      res.send(err);
    }
  });
});

app.listen(3000, err => {
  console.log(`app listen on ${3000}`);
  if (err) {
    console.log(err);
  }
});
