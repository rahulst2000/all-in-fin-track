# All In Fin Track

A modern personal finance dashboard built with TypeScript, CSS, and Vite.

## Live Demo

`https://rahul-all-in-fin-track.netlify.app/`

## Outputs

### Live Output

- Live website: `https://rahul-all-in-fin-track.netlify.app/`

### Project Screenshots

#### Dashboard Home

![Dashboard Home](./output-screnshoots/Screenshot%202026-04-06%20094223.png)

#### Admin Login Popup

![Admin Login Popup](./output-screnshoots/Screenshot%202026-04-06%20101001.png)

#### Transactions and Insights

![Transactions and Insights](./output-screnshoots/Screenshot%202026-04-06%20101016.png)

## Overview

All In Fin Track helps users understand their money in a simple and clean way. The app shows:

- current balance
- money received
- money spent
- saving rate
- spending by category
- recent transactions
- admin-only actions with login protection

The main goal of this project is to make financial information easier to read for normal users.

## Features

### User Features

- clear summary cards
- money trend view
- category-based spending overview
- search transactions
- filter by group
- filter by payment type
- responsive layout for desktop and mobile

### Admin Features

- admin sign-in popup
- username and password check before admin access
- add new payment record
- delete payment record

## Admin Demo Credentials

- User name: `admin`
- Password: `admin123`

## Tech Stack

- TypeScript
- CSS
- Vite
- npm

## Project Structure

```text
all-in-fin-track/
|-- index.html
|-- package.json
|-- package-lock.json
|-- tsconfig.json
|-- README.md
|-- public/
|   |-- favicon.svg
|   |-- icons.svg
|-- src/
|   |-- main.ts
|   |-- style.css
|   |-- counter.ts
|   |-- assets/
```

## How It Works

1. The app loads mock finance transaction data.
2. TypeScript calculates balance, spending, and trend data.
3. The UI updates based on filters and user actions.
4. If the user selects admin mode, a popup appears.
5. Admin access is allowed only after correct login details are entered.

## Setup

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Main Files

- [src/main.ts](C:\Users\Rahul\OneDrive\Desktop\Projects\fintech -dasboard-rontend-project\src\main.ts)
  Main app logic, rendering, filtering, calculations, and admin authentication.

- [src/style.css](C:\Users\Rahul\OneDrive\Desktop\Projects\fintech -dasboard-rontend-project\src\style.css)
  Full UI design, layout, popup styling, responsiveness, and visual theme.

## Why This Project Is Good For Interview

- shows frontend development skills
- shows UI improvement work
- shows TypeScript usage
- shows filtering and dynamic rendering
- shows simple authentication flow
- shows responsive design thinking

## Future Improvements

- real backend integration
- secure authentication with database
- data persistence
- export options
- better analytics charts

## Author

Rahul
