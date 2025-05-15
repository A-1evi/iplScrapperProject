# IPL 2025 Live Score and Fixtures Tracker

A real-time IPL (Indian Premier League) cricket tournament tracker that shows the current points table and upcoming matches schedule. The application scrapes data from the official IPL website and presents it in a modern, user-friendly interface.

## 🚀 Features

- **Live Points Table**
  - Real-time team standings
  - Points calculation
  - Net run rate tracking
  - Team logos and statistics

- **Match Schedule**
  - Complete fixture list
  - Match venue details
  - Team information with logos
  - Date and time information

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Vite as build tool
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM for database operations
- SQLite for data storage
- Puppeteer for web scraping

## 📦 Project Structure

```
├── backend/                # Backend server code
│   ├── src/
│   │   ├── scripts.ts     # Web scraping scripts
│   │   ├── server.ts      # Express server setup
│   │   └── db/
│   │       └── schema.ts  # Database schema
│   └── ...
└── frontend/              # Frontend React application
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── store/         # Redux store setup
    │   └── ...
    └── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd iplScrapperProject
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔄 Data Updates

The application automatically scrapes and updates data from the official IPL website. The points table and fixtures are kept up to date with the latest information.

## 🎨 Features & UI Components

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Points table reflects current tournament standings
- **Match Schedule**: Complete fixture list with venue details
- **Team Information**: Team logos and performance statistics
- **Modern UI**: Clean and intuitive user interface with Tailwind CSS

## 📝 Development Notes

- Uses TypeScript for type safety
- Implements Redux for state management
- RESTful API architecture
- Automated data scraping with error handling
- Efficient database operations with Drizzle ORM

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data source: Official IPL Website
- Built with React and Node.js
- Styled with Tailwind CSS
