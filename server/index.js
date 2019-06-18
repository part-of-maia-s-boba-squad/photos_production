const nr = require('newrelic');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const redis = require('redis');
const db = require('../db/controller.js');

const app = express();
const port = 3002;
const client = redis.createClient({ host: 'redis' });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

const getCache = (req, res) => {
  const { id } = req.params;

  client.get(id, (err, result) => {
    if (err) console.log(err);
    if (result) return res.send(result);
    getPhotos(req, res);
  });
};

const getPhotos = (req, res) => {
  const { id } = req.params;

  db.getPhotos(id, (err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const { rows } = data;
    res.status(200).send(rows);
    client.setex(id, 3600, JSON.stringify(rows));
  });
};

app.get('/API/restaurant/photo/:id', getCache);

app.get('/photo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await db.getPhoto(id);
    res.status(200).send(rows);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.post('/photo', async (req, res) => {
  const { r_id, url, username, date } = req.body;

  try {
    const photo = await db.addPhoto(r_id, url, username, date);
    res.status(201).send(photo);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/photo/url', async (req, res) => {
  const { id, url } = req.query;

  try {
    await db.updatePhotoURL(id, url);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.patch('/photo/user', async (req, res) => {
  const { id, username } = req.query;

  try {
    await db.updatePhotoUser(id, username);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/photo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteFlagsByPhoto(id);
    const photo = await db.deletePhoto(id);
    res.status(200).send(photo);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/flag', async (req, res) => {
  const { id, reason, date } = req.body;

  try {
    await db.flagPhoto(id);
    await db.addFlag(id, reason, date);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/flag/:id', async (req, res) => {
  const id = req.query;

  try {
    await db.deleteFlag(id);
    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/:id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist') + '/index.html');
});

app.listen(port, () => console.log( 'Listening on port ' + port ));