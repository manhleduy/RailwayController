# Seat Selection Modal Implementation

## Overview
This document describes the implementation of an advanced seat selection modal interface for the Order Page. The modal allows users to search for trips, view available seats in a visual grid format with color-coded status indicators, and select seats for their tickets.

## Files Created

### 1. **SeatSelectionModal Component**
**Path:** `frontend/src/components/order/SeatSelectionModal.tsx`

A comprehensive modal component that provides:
- **Trip Search**: Search trips by Trip ID, departure/arrival stations, or track number
- **Trip Selection**: Browse a list of available trips with availability information
- **Seat Grid Display**: Visual grid layout showing all seats with color-coded status:
  - **Green (Available)**: Available for booking - clickable and selectable
  - **Red (Booked)**: Already booked - disabled and non-clickable
  - **Gray (Unavailable)**: Unavailable for booking - disabled and non-clickable
- **Error Handling**: Graceful error handling with retry functionality
- **Loading States**: Visual feedback while fetching data
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

#### Key Features:
- Modal overlay with blur background
- Two-stage selection process:
  1. Trip list with search functionality
  2. Seat grid for selected trip
- Real-time seat status validation
- Toast notifications for user feedback
- Back navigation between views

#### GraphQL Query:
```graphql
query GetTripsWithSeats {
  trips {
    id
    track
    departure_station
    arrival_station
    ETD
    ETA
    seats {
      id
      status
      trip_id
    }
  }
}
```

### 2. **Order Components Index**
**Path:** `frontend/src/components/order/index.ts`

Exports the SeatSelectionModal component for easy importing.

## Files Modified

### 1. **OrderPage Component**
**Path:** `frontend/src/pages/OrderPage.tsx`

#### Changes:
1. **Imports**: Added `SeatSelectionModal` component and `Edit` icon from lucide-react
2. **State Management**: Added two new state variables:
   - `isEditingSeat`: Boolean to track modal open/close state
   - `editingTicketId`: Number to track which ticket is being edited

3. **New Handlers**:
   - `handleEditSeat(ticketId)`: Opens the modal for a specific ticket
   - `handleSelectSeat(seatId)`: Handles seat selection from the modal

4. **Updated TicketCard Component**:
   - **Removed**: Select dropdown for seat selection
   - **Added**: Interactive button with "Click to change seat" text
   - **Updated Props**: Added `onEditSeat` callback handler
   - **UI**: Shows current seat with edit icon for better UX

5. **Modal Integration**: Added `<SeatSelectionModal />` component at the end of the page with:
   - State binding for open/close
   - Callback handlers for seat selection
   - List of currently occupied seats

#### Component Flow:
```
User clicks "Edit Seat Button"
    ↓
handleEditSeat() called
    ↓
Modal opens (isEditingSeat = true)
    ↓
User searches/browses trips
    ↓
User selects trip and seat
    ↓
handleSelectSeat() called
    ↓
Ticket updated with new seat ID
    ↓
Modal closes
    ↓
Toast notification displayed
```

## Technical Specifications

### Seat Status Colors
- **Available**: `bg-emerald-500/20 border-emerald-400/50 text-emerald-200`
- **Booked**: `bg-red-500/20 border-red-400/50 text-red-200`
- **Unavailable**: `bg-gray-500/20 border-gray-400/50 text-gray-200`

### Modal Styling
- Rounded corners with modern design
- Backdrop blur effect for depth
- Responsive grid layout for seats
- Smooth transitions and animations
- Accessibility-focused interactive elements

### Error Handling
The modal handles errors gracefully with:
- Error message display with retry button
- Toast notifications for validation errors
- Disabled state for non-available seats
- Try-catch blocks around API calls

### Data Validation
- Validates seat availability before selection
- Checks seat status against API data
- Prevents selection of already booked seats
- Handles occupied seats in current order

## API Integration

### GraphQL Endpoint
The component queries the `/graphql` endpoint (configured via `VITE_GRAPHQL_URL`)

### Request Format
```javascript
{
  query: GET_TRIPS_WITH_SEATS_QUERY,
  variables: {}
}
```

### Response Structure
```typescript
{
  trips: [
    {
      id: number,
      track: string,
      departure_station: string,
      arrival_station: string,
      ETD: string,
      ETA: string,
      seats: [
        {
          id: number,
          status: string,
          trip_id: number
        }
      ]
    }
  ]
}
```

## User Experience Flow

### Scenario 1: Adding New Ticket
1. User clicks "Add ticket" button
2. A new ticket card appears with "Click to change seat" button
3. User clicks the seat button
4. Modal opens showing available trips
5. User searches for a trip (optional)
6. User clicks on a trip to view seats
7. User clicks on an available seat (green)
8. Modal closes and seat is assigned to ticket
9. Toast confirms selection

### Scenario 2: Changing Existing Seat
1. User clicks the seat button on an existing ticket
2. Modal opens showing available trips
3. User navigates to the desired trip
4. User selects a new seat
5. Old seat becomes available again
6. Toast confirms the change

### Scenario 3: Unavailable Seat
1. User tries to click on a red (booked) or gray (unavailable) seat
2. Toast error appears: "Seat X is not available"
3. Seat remains unselectable

## Responsive Design

### Mobile (< 640px)
- Single column layout for trips
- 4-column grid for seats
- Optimized touch targets
- Adaptive font sizes

### Tablet (640px - 1024px)
- Better spacing for trips list
- 6-column grid for seats
- Improved readability

### Desktop (> 1024px)
- Full feature display
- 8-column grid for seats
- Maximum visual clarity

## Dependencies
- **lucide-react**: Icon library (Edit, Search, X, AlertCircle, etc.)
- **react-hot-toast**: Toast notifications
- **axios**: GraphQL API requests (through requestGraphQL utility)

## Error Cases Handled
1. **Network Error**: Shows error message with retry button
2. **No Trips Available**: Displays empty state message
3. **Unavailable Seat**: Shows validation error toast
4. **Search with No Results**: Displays "No trips found" message
5. **Already Selected Seat**: Prevents double-selection of same seat

## Browser Compatibility
- Modern browsers with ES2023 support
- CSS Grid and Flexbox support required
- CSS Backdrop Filter support for blur effect
- React 18+ required

## Performance Considerations
- Seats grid uses efficient CSS Grid layout
- Memoized filtered trips calculation
- Debounced search input
- Lazy loading of trip data
- Optimized re-renders with proper state management

## Accessibility Features
- Semantic HTML structure
- ARIA labels on buttons
- Keyboard navigation support
- Clear visual focus indicators
- Color contrast ratios meet WCAG standards
- Meaningful error messages

## Future Enhancements (Optional)
1. Add seat price variations by location
2. Implement seat map visualization
3. Add special amenities filter (window seat, aisle seat, etc.)
4. Implement seat preferences saving
5. Add trip time filter (morning, afternoon, evening)
6. Multi-select seats for group bookings

## Testing Recommendations
1. Test with various trip counts (0, 1, 100)
2. Test search with partial matches
3. Test seat selection on different devices
4. Test error states (network errors, invalid data)
5. Test with occupied seats in current order
6. Verify toast notifications appear
7. Test modal open/close transitions
8. Verify keyboard accessibility

## Deployment Notes
- No backend changes required
- Frontend-only implementation
- Compatible with existing order flow
- No breaking changes to existing functionality
- Can be deployed independently

## Troubleshooting

### Modal doesn't open
- Check if `isOpen` prop is correctly set
- Verify state management in OrderPage

### Seats not loading
- Check GraphQL endpoint is accessible
- Verify query syntax matches backend schema
- Check browser console for errors

### Search not working
- Verify input value is bound correctly
- Check filter logic handles all search fields

### Colors not showing correctly
- Verify Tailwind CSS is properly configured
- Check browser DevTools for CSS loading
- Clear browser cache

---

**Implementation Date**: June 7, 2026
**Status**: Complete and Ready for Testing
**Components Created**: 2 files
**Components Modified**: 1 file
