// Modules
import db from '../database';

class Detail {

  static save = async ( { id: id_product, count_paid, full_value }: any, id_invoice: number ) => {
    try {
      const result = await db.query('INSERT INTO `product_invoice` (`id_invoice`, `id_product`, `count`, `full_value`) VALUES (?, ?, ?, ?)', [
        id_invoice,
        id_product,
        count_paid,
        full_value
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default Detail;