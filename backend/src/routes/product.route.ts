import express from 'express';
import listProducts from '../services/product/list.service';
import getProduct from '../services/product/get.service';
import createProduct from '../services/product/create.service';
import updateProduct from '../services/product/update.service';
import deleteProduct from '../services/product/delete.service';

const router = express.Router();

router.post('/list', async (req, res) => {
  await listProducts(req, res);
});

router.get('/', async (req, res) => {
  await getProduct(req, res);
});

router.post('/', async (req, res) => {
  await createProduct(req, res);
});

router.put('/', async (req, res) => {
  await updateProduct(req, res);
});

router.delete('/', async (req, res) => {
  await deleteProduct(req, res);
});

export default router;
