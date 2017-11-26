
// ORDERS API

import express from 'express';
import { authenticationMiddleware } from '../../lib/authService';
const router = express.Router();

// Limits access to this API to authenticated users
router.use(authenticationMiddleware);

router.get('/', async (req,res) => {
  res.send('LIST');
});

router.get('/:id', async (req,res) => {
  res.send('GET');
});

router.post('/', async (req,res) => {
  res.send('NEW');
});

router.put('/:id', async (req,res) => {
  res.send('UPDATE');
});


export default router;