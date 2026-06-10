# Frontend Update Summary: Removing total_price Field

## Overview
Successfully removed all references to `total_price` from the frontend and updated it to use the dynamic calculation from `ticketStatistic._sum` (which comes from the `statisticWithOrderId` function in the backend's ticket service).

## Database Structure Change
- **Removed**: `total_cost` field from the Order model in Prisma schema
- **Implementation**: Total cost is now calculated server-side using the `statisticWithOrderId` function which sums the `SeatClass.price` for all tickets in an order

## Files Modified

### 1. `/frontend/src/lib/api/staff.ts`
**Changes:**
- ✅ Updated `ACCEPT_ORDER_MUTATION` GraphQL query:
  - Removed: `total_price` field
  - Added: `ticketStatistic { _count _sum }` for dynamic calculation
  
- ✅ Updated `REJECT_ORDER_MUTATION` GraphQL query:
  - Removed: `total_price` field  
  - Added: `ticketStatistic { _count _sum }` for dynamic calculation

- ✅ Updated `OrderWithTickets` interface:
  - Removed: `total_price: number;`
  - Updated: `ticketStatistic` now includes `_sum?: number;`

### 2. `/frontend/src/pages/StaffOrdersPage.tsx`
**Changes:**
- ✅ Line 303: Changed display from `order.total_price` to `order.ticketStatistic._sum ?? 0`
- This ensures staff see the calculated total from all tickets in the order

### 3. `/frontend/src/components/dashboard/DashboardView.tsx`
**Changes:**
- ✅ Line 433: Changed display from `order.total_price` to `order.ticketStatistic._sum ?? 0`
- This ensures customers see the correct total on their dashboard

### 4. `/frontend/src/pages/OrderPage.tsx`
**Changes:**
- ✅ Updated `OrderRecord` type:
  - Removed: `total_price: number;` field
  
- ✅ Updated `initialOrder` object:
  - Removed: `total_price: 0;` initialization
  
- ✅ Updated `handleAddTicket()` function:
  - Removed: Manual `total_price` increment logic
  - Now relies on existing `totalPrice` useMemo for dynamic calculation
  
- ✅ Updated `handleDeleteTicket()` function:
  - Removed: Manual `total_price` decrement logic
  - Now relies on existing `totalPrice` useMemo for dynamic calculation
  
- ✅ Updated `handleSubmitOrder()` function:
  - Removed: `total_price: createdOrder.total_price,` assignment
  - The `totalPrice` is already calculated dynamically from visible tickets

## How Total Cost is Now Calculated

### Backend (Server-side)
The backend's `ticketService.statisticWithOrderId(orderId)` function:
```sql
SELECT COUNT(t.order_id) as _count, SUM(sc.price) as _sum
FROM "Ticket" t
INNER JOIN "Seat" s ON t.seat_id = s.id
INNER JOIN "SeatClass" sc ON s.seat_class_id = sc.id
WHERE t.order_id = ${orderId}
GROUP BY t.order_id
```

### Frontend (Display)
- GraphQL resolver automatically calls `ticketService.statisticWithOrderId()` for each order
- The `ticketStatistic._sum` is returned in GraphQL responses
- Components display this value with fallback: `order.ticketStatistic._sum ?? 0`

## Verification
✅ All `total_price` references removed from frontend  
✅ All GraphQL queries updated to fetch `ticketStatistic._sum`  
✅ All interfaces updated correctly  
✅ Staff Orders page updated  
✅ Customer Dashboard updated  
✅ Order Page updated  
✅ No compilation errors

## Testing Recommendations
1. Create a new order and verify the total displays correctly
2. Check staff orders page - verify totals match sum of ticket prices
3. Check customer dashboard - verify recent orders show correct totals
4. Add/remove tickets from order and verify display updates
5. Accept/reject orders on staff page - verify mutations work correctly
