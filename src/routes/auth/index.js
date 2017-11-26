
// AUTHENTICATION API

import express from 'express';
import { createUser } from './service';
import { generateToken } from '../../lib/authService';

const router = express.Router();

router.post('/register', async (req,res) => {
  const result = await createUser({username: req.body.username, password: req.body.password});

  if (result.errorCount > 0) return res.send(result);

  if (result.errorCount == 0) result.message = 'User created successfully';
  return res.send(result);
});

router.post('/login', async (req,res) => {
  console.log({username: req.body.username, password: req.body.password})
  res.send(await generateToken({username: req.body.username, password: req.body.password}));
});


export default router;