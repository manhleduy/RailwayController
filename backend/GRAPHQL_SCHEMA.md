# GraphQL API Complete Schema

## Enums

```graphql
enum role {
  CUSTOMER
  STAFF
}

enum SeatStatus {
  AVAILABLE
  BOOKED
  UNAVAILABLE
}

enum TicketStatus {
  OPEN
  RESOLVED
}

enum OrderStatus {
  PENDING
  CONFIRMED
  DENIED
}
```

---

## Object Types

### User (Base)
```graphql
type User {
  id: String!
  email: String!
  full_name: String!
  phone: String!
  role: String!
}
```

### AuthPayload
```graphql
type AuthPayload {
  token: String!
  user: User!
}
```

### Customer
```graphql
type Customer {
  id: String!
  full_name: String!
  email: String!
  phone: String!
  rank: Int!
  createdAt: String!
}
```

### Staff
```graphql
type Staff {
  id: String!
  full_name: String!
  email: String!
  phone: String!
  role: String!
  createdAt: String!
}
```

### Trip
```graphql
type Trip {
  id: Int!
  track: String!
  departureStation: String!
  arrivalStation: String!
  etd: String!
  eta: String!
  seats: [Seat!]
}
```

### Seat
```graphql
type Seat {
  id: Int!
  status: String!
  tripId: Int!
  seatNumber: String!
  isAvailable: Boolean!
}
```

### Order
```graphql
type Order {
  id: Int!
  customerId: String!
  staffId: String
  totalPrice: Float!
  status: String!
  paymentMethod: String!
  tickets: [Ticket!]
  createdAt: String!
}
```

### Ticket
```graphql
type Ticket {
  id: Int!
  orderId: Int!
  passCCCD: String!
  passName: String!
  price: Float!
  status: String!
  seatId: Int!
}
```

### Shift
```graphql
type Shift {
  id: Int!
  staffId: String!
  startTime: String!
  endTime: String!
}
```

---

## Queries

### Auth Queries
```graphql
query {
  validateToken(token: "jwt-token"): AuthPayload
}
```

### Trip Queries
```graphql
query {
  # Get all trips with optional limit
  trips(limit: Int): [Trip!]!
  
  # Get specific trip
  trip(id: Int!): Trip
  
  # Get trip with all seat details
  tripDetails(id: Int!): Trip
  
  # Get available seats in trip
  availableSeats(tripId: Int!): [Seat!]!
  
  # Get all seats in trip (any status)
  seatsByTrip(tripId: Int!): [Seat!]!
}
```

### Order Queries
```graphql
query {
  # Get orders (filtered by customer if provided)
  orders(customerId: String): [Order!]!
  
  # Get specific order
  order(id: Int!): Order
  
  # Get tickets in order
  tickets(orderId: Int!): [Ticket!]!
}
```

### User Queries
```graphql
query {
  # Get customer profile
  customer(id: String!): Customer
  
  # Get all customers
  customers: [Customer!]!
  
  # Get staff profile
  staff(id: String!): Staff
  
  # Get all staff members
  staffMembers: [Staff!]!
}
```

### Shift Queries
```graphql
query {
  # Get staff shifts
  staffShifts(staffId: String!): [Shift!]!
}
```

---

## Mutations

### Auth Mutations
```graphql
mutation {
  # User login
  login(
    email: String!
    password: String!
  ): AuthPayload!
  
  # User signup
  signup(
    id: String!
    email: String!
    password: String!
    full_name: String!
    phone: String!
    role: String
  ): AuthPayload!
  
  # Logout (marks session invalid)
  logout: Boolean!
  
  # Request password reset
  resetPassword(email: String!): Boolean!
}
```

### Customer Mutations
```graphql
mutation {
  # Update customer profile
  updateCustomer(
    id: String!
    full_name: String!
    phone: String!
  ): Customer!
}
```

### Staff Mutations
```graphql
mutation {
  # Update staff profile
  updateStaff(
    id: String!
    full_name: String!
    phone: String!
  ): Staff!
}
```

### Order Mutations
```graphql
mutation {
  # Create new order
  createOrder(
    customerId: String!
    totalPrice: Float!
    paymentMethod: String!
  ): Order!
  
  # Update order status
  updateOrderStatus(
    orderId: Int!
    status: String!
  ): Order!
  
  # Cancel order (refund seats)
  cancelOrder(orderId: Int!): Boolean!
}
```

### Ticket Mutations
```graphql
mutation {
  # Add ticket to order
  createTicket(
    orderId: Int!
    passCCCD: String!
    passName: String!
    price: Float!
    seatId: Int!
  ): Ticket!
}
```

### Seat Mutations
```graphql
mutation {
  # Update seat status
  updateSeatStatus(
    seatId: Int!
    status: String!
  ): Seat!
}
```

### Shift Mutations
```graphql
mutation {
  # Create staff shift
  createShift(
    staffId: String!
    startTime: String!
    endTime: String!
  ): Shift!
  
  # Update shift times
  updateShift(
    id: Int!
    startTime: String
    endTime: String
  ): Shift!
  
  # Delete shift
  deleteShift(id: Int!): Boolean!
}
```

---

## Example Requests

### 1. Customer Login
```graphql
mutation Login {
  login(
    email: "customer@example.com"
    password: "password123"
  ) {
    token
    user {
      id
      email
      full_name
      role
    }
  }
}
```

### 2. Browse Available Trips
```graphql
query AvailableTrips {
  trips(limit: 10) {
    id
    track
    departureStation
    arrivalStation
    etd
    eta
    seats {
      id
      seatNumber
      status
      isAvailable
    }
  }
}
```

### 3. Check Available Seats
```graphql
query AvailableSeats {
  availableSeats(tripId: 1) {
    id
    seatNumber
    isAvailable
  }
}
```

### 4. Create Order
```graphql
mutation CreateOrder {
  createOrder(
    customerId: "CUST001"
    totalPrice: 150.00
    paymentMethod: "creditcard"
  ) {
    id
    customerId
    totalPrice
    status
  }
}
```

### 5. Book Ticket
```graphql
mutation BookTicket {
  createTicket(
    orderId: 1
    passCCCD: "123456789"
    passName: "John Doe"
    price: 75.00
    seatId: 101
  ) {
    id
    passCCCD
    passName
    price
    status
  }
}
```

### 6. Confirm Order
```graphql
mutation ConfirmOrder {
  updateOrderStatus(
    orderId: 1
    status: "Confirmed"
  ) {
    id
    status
    tickets {
      id
      passName
      seatId
    }
  }
}
```

### 7. Get Customer Orders
```graphql
query CustomerOrders {
  orders(customerId: "CUST001") {
    id
    status
    totalPrice
    createdAt
    tickets {
      id
      passName
      price
      status
    }
  }
}
```

### 8. Update Customer Profile
```graphql
mutation UpdateProfile {
  updateCustomer(
    id: "CUST001"
    full_name: "John Updated"
    phone: "9876543210"
  ) {
    id
    full_name
    phone
    email
  }
}
```

### 9. Get Staff Shifts
```graphql
query StaffSchedule {
  staffShifts(staffId: "STAFF001") {
    id
    startTime
    endTime
  }
}
```

### 10. Accept Order (Staff)
```graphql
mutation AcceptOrder {
  updateOrderStatus(
    orderId: 1
    status: "Confirmed"
  ) {
    id
    status
    customer {
      id
      full_name
      email
    }
  }
}
```

---

## Response Examples

### Success Response
```json
{
  "data": {
    "trips": [
      {
        "id": 1,
        "track": "Track-1",
        "departureStation": "Central Station",
        "arrivalStation": "North Station",
        "etd": "14:30",
        "eta": "16:45",
        "seats": [
          {
            "id": 101,
            "seatNumber": "A1",
            "status": "AVAILABLE",
            "isAvailable": true
          }
        ]
      }
    ]
  }
}
```

### Error Response
```json
{
  "errors": [
    {
      "message": "Invalid email or password",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "exception": {
          "stacktrace": [...]
        }
      }
    }
  ]
}
```

---

## Rate Limiting

Current limits (can be configured):
- Auth endpoints: 5 requests/minute
- Query endpoints: 100 requests/minute
- Mutation endpoints: 50 requests/minute

---

## Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| UNAUTHENTICATED | 401 | JWT invalid or expired |
| FORBIDDEN | 403 | User lacks permission |
| NOT_FOUND | 404 | Resource doesn't exist |
| BAD_REQUEST | 400 | Invalid input |
| INTERNAL_SERVER_ERROR | 500 | Server error |
| CONFLICT | 409 | Duplicate or conflict |

---

## Authentication Header

All protected queries/mutations require:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Example with fetch:
```javascript
fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGc...'
  },
  body: JSON.stringify({
    query: '{ customer(id: "CUST001") { ... } }'
  })
})
```

---

## Pagination (Future)

When implemented, use:
```graphql
query {
  trips(limit: 10, offset: 0) {
    id
    track
  }
}
```

---

## Subscriptions (Future)

Real-time updates via Socket.io instead of GraphQL subscriptions

---

**Schema Version: 1.0**
**Last Updated: May 26, 2026**
