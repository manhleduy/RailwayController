import { requestGraphQL } from './graphql';

export interface OrderTicketInput {
  pass_cccd: string;
  pass_name: string;
  order_id: number;
  seat_id: number;
}

export interface CreateOrderInput {
  customer_id: string;
  payment_method: string;
  tickets: OrderTicketInput[];
}

export interface CreatedOrder {
  id: number;
  customer_id: string;
  payment_method: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardCustomer {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  rank: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardOrder {
  id: number;
  customer_id: string;
  payment_method: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStatistic {
  year: number;
  month: number;
  _sum: number;
  _count: number;
}

export interface CustomerDashboardSnapshot {
  customer: DashboardCustomer | null;
  orders: DashboardOrder[];
  statistic: DashboardStatistic[];
}

const ORDER_FIELDS = `
  id
  customer_id
  payment_method
  total_price
  status
  created_at
  updated_at
`;

const CUSTOMER_FIELDS = `
  id
  full_name
  email
  phone
  rank
  created_at
  updated_at
`;

const STATISTIC_FIELDS = `
  year
  month
  _sum
  _count
`;

const CUSTOMER_DASHBOARD_QUERY = `
  query CustomerDashboard($id: String!, $year: Int!) {
    customer(id: $id) {
      ${CUSTOMER_FIELDS}
    }
    customerOrders(id: $id) {
      ${ORDER_FIELDS}
    }
    statistic(data: { id: $id, year: $year }) {
      ${STATISTIC_FIELDS}
    }
  }
`;

const CREATE_ORDER_MUTATION = `
  mutation CreateOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
      ${ORDER_FIELDS}
    }
  }
`;

export async function createOrder(input: CreateOrderInput) {
  const data = await requestGraphQL<{ createOrder: CreatedOrder }, { data: CreateOrderInput }>(
    CREATE_ORDER_MUTATION,
    { data: input }
  );

  return data.createOrder;
}

export async function fetchCustomerDashboard(id: string, year: number) {
  const data = await requestGraphQL<
    CustomerDashboardSnapshot,
    { id: string; year: number }
  >(CUSTOMER_DASHBOARD_QUERY, { id, year });

  return data;
}
