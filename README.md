# The TajEffect - Hair Salon Booking App

A beautiful, modern appointment booking system for The TajEffect hair salon. This app provides a seamless booking experience for customers and an easy-to-use admin dashboard for managing appointments.

## Features

### Customer Features
- **Beautiful, Modern UI**: Clean, professional design that works on all devices
- **Service Selection**: Choose from haircuts, coloring, treatments, and special styling
- **Date & Time Booking**: Interactive calendar with available time slots
- **Customer Information**: Simple form to collect contact details and special requests
- **Booking Confirmation**: Clear confirmation with all appointment details
- **Mobile Responsive**: Works perfectly on phones, tablets, and desktops

### Admin Features
- **Dashboard Overview**: See total bookings, today's appointments, revenue, and unique customers
- **Appointment Management**: View all bookings in an organized table
- **Status Management**: Mark appointments as completed or cancelled
- **Filtering**: Filter appointments by status and date
- **Real-time Updates**: See changes immediately

## How to Use

### For Customers
1. Open `index.html` in your web browser
2. Click "Book Now" or scroll to the booking section
3. Select your desired service (haircut, coloring, treatment, or styling)
4. Choose your preferred date and time
5. Fill in your contact information
6. Confirm your booking
7. You'll receive a confirmation with all your appointment details

### For Admin (Your Mom)
1. Open `admin.html` in your web browser
2. View the dashboard for quick stats
3. See all appointments in the table below
4. Use filters to find specific appointments
5. Mark appointments as completed when done
6. Cancel appointments if needed

## Files Structure

```
hair-booking-app/
├── index.html          # Main booking page for customers
├── admin.html          # Admin dashboard for managing appointments
├── styles.css          # Beautiful styling for both pages
├── script.js           # JavaScript functionality for booking
└── README.md           # This file
```

## Customization

### Business Information
To customize the business information, edit these sections in `index.html`:

- **Business Name**: Change "The TajEffect" to your preferred name
- **Contact Information**: Update the phone number, address, and hours in the contact section
- **Services**: Modify the services, descriptions, and prices in the services grid

### Styling
The app uses a beautiful purple gradient theme. To change colors:

1. Open `styles.css`
2. Look for color values like `#667eea` and `#764ba2`
3. Replace with your preferred colors

### Services and Pricing
To update services and prices:

1. In `index.html`, find the services grid section
2. Update the service cards with new names, descriptions, and prices
3. Make sure to update the `data-price` attribute for each service

## Technical Details

- **No Server Required**: This app works entirely in the browser
- **Local Storage**: Appointments are saved in the browser's local storage
- **Responsive Design**: Works on all screen sizes
- **Modern Web Standards**: Uses HTML5, CSS3, and modern JavaScript

## Browser Compatibility

This app works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Data Storage

Appointments are stored in the browser's local storage. This means:
- Data persists between browser sessions
- Each browser/device has its own data
- Data is stored locally on the device

For a production environment, you would want to connect this to a real database.

## Getting Started

1. Download all the files to a folder on your computer
2. Open `index.html` in your web browser
3. Start booking appointments!

## Support

This app is designed to be simple and intuitive. If you need any modifications or have questions, the code is well-commented and easy to understand.

## Future Enhancements

Potential features that could be added:
- Email notifications
- SMS reminders
- Online payment integration
- Customer accounts
- Recurring appointments
- Staff scheduling
- Inventory management

---

**The TajEffect** - Making hair appointments beautiful and simple! 💇‍♀️✨


