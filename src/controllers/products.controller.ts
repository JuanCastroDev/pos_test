// Modules
import { RequestHandler } from 'express';

// Querys
import Product from '../database/product';

// Interfaces
import { IProduct } from '../types/database';

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'internal server error' });
  }
}

export const getOneProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'internal server error' });
  }
}

export const newProduct: RequestHandler = async (req, res) => {
  const newProduct: IProduct = req.body;
  try {
    const result = await Product.save(newProduct);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'internal server error' });
  }
}

export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const productData: IProduct = req.body;
  try {
    const result = await Product.update(productData, id);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'internal server error' });
  }
}

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.delete(id);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'internal server error' });
  }
}
