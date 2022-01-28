interface IproductsinInvoiceBody {
  id: number;
  count: number;
}

export interface IInvoiceBody {
  id_customer: number;
  first_name_customer: string;
  last_name_customer: string;
  description: string
  products: IproductsinInvoiceBody[];
  value_paid: string;
}