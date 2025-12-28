import express from 'express';
import { profileSchema } from './schema.js';

const app = express();
app.use(express.json());

let profiles = [];
let id = 1;

// CREATE
app.post('/profiles', (req, res) => {
  const { error, value } = profileSchema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const profile = { id: id++, ...value };
  profiles.push(profile);
  res.status(201).json(profile);
});

// READ ALL
app.get('/profiles', (req, res) => res.json(profiles));

// READ ONE
app.get('/profiles/:id', (req, res) => {
  const profile = profiles.find(p => p.id == req.params.id);
  if (!profile) return res.sendStatus(404);
  res.json(profile);
});

// UPDATE (PUT)
app.put('/profiles/:id', (req, res) => {
  const { error, value } = profileSchema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const i = profiles.findIndex(p => p.id == req.params.id);
  if (i === -1) return res.sendStatus(404);

  profiles[i] = { id: profiles[i].id, ...value };
  res.json(profiles[i]);
});

// PARTIAL UPDATE (PATCH)
app.patch('/profiles/:id', (req, res) => {
  const { error, value } = profileSchema.min(1).validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const profile = profiles.find(p => p.id == req.params.id);
  if (!profile) return res.sendStatus(404);

  Object.assign(profile, value);
  res.json(profile);
});

// DELETE
app.delete('/profiles/:id', (req, res) => {
  profiles = profiles.filter(p => p.id != req.params.id);
  res.sendStatus(204);
});

app.listen(3000);
