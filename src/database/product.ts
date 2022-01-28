// Modules
import db from '../database';

// Interfaces
import { IProduct } from '../types/database';
import { IInvoiceBody } from '../types/invoiceBody';

class Product {

  static save = async ({ cod, name, count, value }: IProduct) => {
    try {
      const result = await db.query('INSERT INTO `product` (`cod`, `name`, `count`, `value`) VALUES (?, ?, ?, ?)', [ cod, name, count, value ]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static update = async ({ count, value }: IProduct, id: number) => {
    try {
      const result = await db.query('UPDATE `product` SET ? WHERE `id` = ?', [ { count, value }, id]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static delete = async (id: string) => {
    try {
      const result = await db.query('UPDATE `product` SET `deleted_at` = CURRENT_TIMESTAMP() WHERE `id` = ?', [ id ]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static findAll = async () => {
    try {
      const result: any = await db.query('SELECT * FROM `product` WHERE `deleted_at` IS NULL');
      const products: IProduct[] = result[0];
      return products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static findOne = async ( id: string ) => {
    try {
      const result: any = await db.query('SELECT * FROM `product` WHERE `id` = ? AND `deleted_at` IS NULL', [ id ]);
      const product: IProduct = result[0][0];
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static findByIds = async ( { products }: IInvoiceBody ) => {
    const ids = products.map(product => product.id);
    try {
      const result: any = await db.query('SELECT * FROM `product` WHERE `id` IN (?)', [ ids ]);
      const product: IProduct[] = result[0];
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default Product;