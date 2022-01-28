// Modules
import db from '../database';

class Invoice {

  static save = async ( { id_employee, id_customer, first_name_customer, last_name_customer, description, value_paid, full_value, superavit }: any ) => {
    try {
      const result = await db.query("INSERT INTO `invoice` (`id_employee`, `id_customer`, `first_name_customer`, `last_name_customer`, `description`, `value_paid`, `full_value`, `superavit`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
        id_employee,
        id_customer,
        first_name_customer,
        last_name_customer,
        description,
        value_paid,
        full_value,
        superavit,
      ]);
      console.log(result);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static findByDate = async ( date: string ) => {
    try {
      const result = await db.query("SELECT `invoice`.* FROM `invoice` INNER JOIN `employee` ON `employee`.`id` = `invoice`.`id_employee` INNER JOIN `product_invoice` ON `invoice`.`id` = `product_invoice`.`id_invoice` INNER JOIN `product` ON `product`.`id` = `product_invoice`.`id_product` WHERE `invoice`.`created_at` LIKE ?;", [ `${date}%` ]);
      console.log(result[0]);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default Invoice;