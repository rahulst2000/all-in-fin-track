# Finance Dashboard UI

A clean and interactive finance dashboard interface built with vanilla TypeScript and CSS, demonstrating frontend development skills with modern UI/UX patterns.

## Overview

This project is a responsive finance dashboard that allows users to track their financial activity. It features a summary overview, transaction management, spending visualizations, and role-based UI for different user types.

## Features Implemented

### 1. Dashboard Overview ✓
- **Summary Cards**: Display Total Balance, Total Income, and Total Expenses with trend indicators
- **Balance Trend Chart**: Monthly spending trend visualization using bar charts
- **Spending Breakdown**: Categorical spending visualization showing top expense categories

### 2. Transactions Section ✓
- **Transaction List**: Display transactions with Date, Amount, Category, Type, and Description
- **Search Functionality**: Search transactions by description or category
- **Category Filtering**: Filter transactions by category
- **Type Filtering**: Filter by Income or Expense
- **Responsive Table**: Clean, sortable-by-date transaction table with proper formatting

### 3. Basic Role-Based UI ✓
- **Viewer Role**: Read-only access to all data
- **Admin Role**: 
  - Full view of all features
  - "Add Transaction" button in header
  - Delete transaction functionality
  - Can add new transactions via modal form
- **Role Switcher**: Dropdown in header to switch between Viewer and Admin roles

### 4. Insights Section ✓
- **Highest Spending Category**: Shows which category has highest expenses
- **Total Expenses**: Overall spending summary
- **Average Transaction**: Calculates average expense amount
- **Total Transactions**: Count of all transactions

### 5. State Management ✓
- Clean TypeScript state object managing:
  - Current user role
  - All transactions
  - Filter states (category, type, search term)
- State updates trigger complete re-render
- Data persists during session

### 6. UI and UX ✓
- **Clean Design**: Modern, minimal design with clear visual hierarchy
- **Color System**: Professional color palette with semantic colors (success, danger, warning)
- **Responsive Layout**: 
  - Works on desktop (100% width)
  - Tablet-friendly (grid adjusts to 2 columns)
  - Mobile-friendly (1 column layout)
- **Empty States**: Graceful handling of no-data scenarios
- **Hover Effects**: Interactive feedback on buttons and cards
- **Modal Dialog**: User-friendly form for adding transactions

## Technical Stack

- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Plain CSS with CSS variables for theming
- **State Management**: Plain TypeScript object with re-render pattern
- **Data**: Mock data with 10 sample transactions

## Project Structure

```
fintech-dashboard-frontend-project/
├── index.html              # Main HTML entry point
├── package.json           # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── README.md            # This file
└── src/
    ├── main.ts          # Complete dashboard application
    ├── style.css        # All CSS styles
    ├── counter.ts       # Utility file (minimal)
    └── assets/          # Static assets
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone or extract the project**
   ```bash
   cd fintech-dashboard-frontend-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## Usage Guide

### Switching Roles
1. Open the dashboard
2. Use the "Role" dropdown in the top-right corner
3. Select between "Viewer" and "Admin"

### As a Viewer
- View all financial summary cards
- Browse all transactions
- Filter transactions by category or type
- Search for specific transactions
- View insights about spending patterns

### As an Admin
- All Viewer features plus:
- Click "+ Add Transaction" button
- Fill in transaction details:
  - Date: When the transaction occurred
  - Description: What it was for
  - Category: Dropdown list of categories
  - Type: Income or Expense
  - Amount: Dollar amount
- Delete transactions using the "Delete" button in the table
- New transactions appear immediately in the list

### Filtering
- **Search**: Type in the search field to find transactions by description or category
- **Category**: Select a category from the dropdown to show only those transactions
- **Type**: Filter to show only Income or Expense transactions
- **Multiple Filters**: Combine search, category, and type filters together

## Design Decisions

### Vanilla TypeScript Approach
- No external frameworks for simplicity and purity
- Demonstrates core JavaScript/TypeScript skills
- Fast, lightweight application
- Clear, readable code structure

### State Management
- Single state object for entire app
- Event handlers update state and trigger re-render
- Clean separation of data and presentation logic
- Easy to understand and debug

### Styling
- CSS-in-HTML structure for organization
- CSS variables for consistent theming
- Mobile-first responsive design
- Semantic color system (success, danger, warning)

### Mock Data
- 10 realistic transactions covering:
  - Multiple income sources (Salary, Freelance, Bonus)
  - Various expense categories (Food, Transportation, Entertainment, etc.)
  - Mix of income and expense types
  - Different dates for trend visualization

## Features Breakdown

| Requirement | Status | Details |
|------------|--------|---------|
| Dashboard Overview | ✓ | Summary cards, trend chart, spending breakdown |
| Transactions Section | ✓ | List, search, filter, sorting by date |
| Role-Based UI | ✓ | Viewer (read-only) and Admin (add/delete) roles |
| Insights Section | ✓ | Top category, expenses, averages, transaction count |
| State Management | ✓ | TypeScript state object with filtered views |
| UI/UX | ✓ | Clean design, responsive, edge case handling |
| Documentation | ✓ | This README with setup and usage instructions |

## Optional Enhancements Implemented

- Clean, professional design aesthetic
- Smooth transitions and hover effects
- Proper currency formatting
- Date formatting for readability
- Modal dialog for adding transactions
- Responsive grid layouts
- Semantic HTML and accessibility considerations

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Future Enhancement Possibilities

- Dark mode toggle
- Local storage persistence
- Export to CSV/JSON
- Advanced filtering with date range
- Transaction editing capability
- Budget categories with goals
- Charts library integration (Chart.js, Recharts)
- API integration for real data
- User authentication

## Notes

- This is a frontend-only implementation without backend
- Mock data is generated on page load
- All data is session-only (not persisted)
- Fully functional within browser
- No external API calls required

---

**Assignment Submission**: This dashboard demonstrates understanding of:
✓ Frontend component architecture
✓ State management principles
✓ Responsive UI design
✓ User interaction handling
✓ Clean code structure
✓ TypeScript typing
✓ CSS organization
✓ UX best practices
