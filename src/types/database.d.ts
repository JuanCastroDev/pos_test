export interface IEmployee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  admin: boolean;
  days: string;
  start_turn: string;
  end_turn: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface IConnection {
  id: number;
  id_employee: number;
  created_at: string;
}

export interface IInvoice {
  id: number;
  state: boolean;
  id_employee: number;
  id_customer: number;
  first_name_customer: string;
  last_name_customer: string;
  description: string;
  value_paid: string;
  full_value: string;
  superavit: string;
  created_at: string;
}

export interface IProduct {
  id: number;
  cod: string;
  name: string;
  count: number;
  value: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface IProductInvoice {
  id: number;
  id_invoice: number;
  id_product: number;
  count: number;
  full_value: number;
}