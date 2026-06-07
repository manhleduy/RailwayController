import { requestGraphQL } from './graphql';

export interface StaffOrderStatistic {
  year: number;
  month: number;
  _count: number;
}

export interface StaffDashboardSnapshot {
  statistics: StaffOrderStatistic[];
  year: number;
}

const GET_STAFF_STATISTIC_QUERY = `
  query StaffStatistic($data: StatisticInput!) {
    staffStatistic(data: $data) {
      year
      month
      _count
    }
  }
`;

const GET_ALL_ORDERS_QUERY = `
  query AllOrders {
    allOrders {
      id
      customer_id
      staff_id
      payment_method
      total_price
      status
      created_at
      updated_at
      tickets {
        id
        pass_name
        pass_cccd
        seat_id
        price
        created_at
        updated_at
      }
      ticketStatistic {
        _count
      }
    }
  }
`;

const ACCEPT_ORDER_MUTATION = `
  mutation AcceptOrder($data: UpdateOrderInput!) {
    acceptOrder(data: $data) {
      id
      customer_id
      staff_id
      payment_method
      total_price
      status
      created_at
      updated_at
    }
  }
`;

const REJECT_ORDER_MUTATION = `
  mutation RejectOrder($data: UpdateOrderInput!) {
    rejectOrder(data: $data) {
      id
      customer_id
      staff_id
      payment_method
      total_price
      status
      created_at
      updated_at
    }
  }
`;

const SET_SEAT_AVAILABLE_MUTATION = `
  mutation SetSeatToAvailable($id: Float!) {
    setSeatToAvailable(id: $id) {
      id
      status
      trip_id
      created_at
      updated_at
    }
  }
`;

const SET_SEAT_BOOKED_MUTATION = `
  mutation SetSeatToBooked($id: Float!) {
    setSeatToBooked(id: $id) {
      id
      status
      trip_id
      created_at
      updated_at
    }
  }
`;

const SET_SEAT_UNAVAILABLE_MUTATION = `
  mutation SetSeatToUnavailable($id: Float!) {
    setSeatToUnavailable(id: $id) {
      id
      status
      trip_id
      created_at
      updated_at
    }
  }
`;

export async function fetchStaffDashboard(
  staffId: string,
  year: number
): Promise<StaffDashboardSnapshot> {
  const response = await requestGraphQL<
    { staffStatistic: StaffOrderStatistic[] },
    { data: { id: string; year: number } }
  >(GET_STAFF_STATISTIC_QUERY, {
    data: { id: staffId, year },
  });

  return {
    statistics: response.staffStatistic || [],
    year,
  };
}

export interface OrderWithTickets {
  id: number;
  customer_id: string;
  staff_id: string | null;
  payment_method: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  tickets: Array<{
    id: number;
    pass_name: string;
    pass_cccd: string;
    seat_id: number;
    price: number;
    created_at: string;
    updated_at: string;
  }>;
  ticketStatistic: {
    _count: number;
  };
}

export async function fetchAllOrders(): Promise<OrderWithTickets[]> {
  const response = await requestGraphQL<
    { allOrders: OrderWithTickets[] },
    {}
  >(GET_ALL_ORDERS_QUERY, {});

  return response.allOrders || [];
}

export async function acceptOrder(
  orderId: number,
  staffId: string
): Promise<any> {
  return requestGraphQL(ACCEPT_ORDER_MUTATION, {
    data: { order_id: orderId, staff_id: staffId },
  });
}

export async function rejectOrder(
  orderId: number,
  staffId: string
): Promise<any> {
  return requestGraphQL(REJECT_ORDER_MUTATION, {
    data: { order_id: orderId, staff_id: staffId },
  });
}

export async function setSeatAvailable(seatId: number): Promise<any> {
  return requestGraphQL(SET_SEAT_AVAILABLE_MUTATION, {
    id: seatId,
  });
}

export async function setSeatBooked(seatId: number): Promise<any> {
  return requestGraphQL(SET_SEAT_BOOKED_MUTATION, {
    id: seatId,
  });
}

export async function setSeatUnavailable(seatId: number): Promise<any> {
  return requestGraphQL(SET_SEAT_UNAVAILABLE_MUTATION, {
    id: seatId,
  });
}
