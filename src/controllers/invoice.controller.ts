// Modules
import { RequestHandler } from 'express';

// Querys
import Product from '../database/product';
import Invoice from '../database/invoice';
import Detail from '../database/detail';

// Interfaces
import { IInvoiceBody } from '../types/invoiceBody';

export const getInvoiceByDay: RequestHandler = async (req, res) => {
  const { date } = req.params;
  try {
    const invoices = await Invoice.findByDate(date);
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
}

export const newInvoice: RequestHandler = async (req, res) => {
  const invoiceData: IInvoiceBody = req.body; 
  let full_value: number = 0;
  let superavit: number = 0;
  const productsPaid = [];
  try {
    const products = await Product.findByIds(invoiceData);
    for (const invoiceProduct of invoiceData.products) {
      const product = products.find(product => product.id == invoiceProduct.id);
      const { value }: any = product;
      productsPaid.push({ ...product, count_paid: invoiceProduct.count, full_value: invoiceProduct.count * Number(value) });
      if (!product) {
        return res.status(400).json({ success: false, msg: `Error, some products were not found in the database, id: ${ invoiceProduct.id }` })
      }
      if (invoiceProduct.count > product.count) {
        return res.status(400).json({ success: false, msg: 'Error, insufficient amount of product', product })
      }
      full_value = full_value + (invoiceProduct.count * product.value);
    }
    if (full_value > Number(invoiceData.value_paid) ) {
      return res.status(400).json({ success: false, msg: 'Error, payment error' })
    }
    superavit = Number(invoiceData.value_paid) - full_value;
    for (const invoiceProduct of invoiceData.products) {
      const product: any = products.find(product => product.id == invoiceProduct.id);
      product.count = product.count - invoiceProduct.count;
      await Product.update(product, product.id);
    }
    const { id }: any = req.user;
    const invoice = {
      id_employee: id,
      id_customer: invoiceData.id_customer,
      first_name_customer: invoiceData.first_name_customer,
      last_name_customer: invoiceData.last_name_customer,
      description: invoiceData.description,
      value_paid: invoiceData.value_paid,
      full_value: full_value.toString(),
      superavit: superavit.toString(),
    }
    const { insertId }: any = await Invoice.save(invoice);
    for (const productPaid of productsPaid) {
      await Detail.save(productPaid, insertId);
    } 
    const { products: deleted, value_paid, ...data } = invoiceData; 
    const response = { data, value_paid: Number(value_paid), full_value, superavit, productsPaid }
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Internal server error' });
  }
}