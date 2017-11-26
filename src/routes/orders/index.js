
// ORDERS API

import express from 'express';
import { authenticationMiddleware } from '../../lib/authService';
import { createOrder, findOrder, listOrders, updateOrder } from './service';
const router = express.Router();

// Limits access to this API to authenticated users
router.use(authenticationMiddleware);

router.get('/', async (req,res) => {
  let count = req.query.count || undefined;
  let page = req.query.page || undefined;
  let sort = req.query.sort || undefined;

  let orders = await listOrders({count, page, sort});

  return res.send(orders);
});

router.get('/:id', async (req,res) => {
  let order = await findOrder({id:req.params.id});
  return res.send(order);
});

router.post('/', async (req,res) => {
  let order = await createOrder({pickupAddress: req.body.pickupAddress, deliveryAddress: req.body.deliveryAddress});
  return res.send(order);
});

router.put('/:id', async (req,res) => {
  let order = await updateOrder({id: req.params.id, pickupAddress: req.body.pickupAddress, deliveryAddress: req.body.deliveryAddress});
  return res.send(order);
});

export default router;