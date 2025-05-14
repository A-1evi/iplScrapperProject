import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import PointTable from "./pages/PointTable";
import FullMatchSch from "./pages/FullMatchSch";
import UpcomingMatch from "./pages/UpcomingMatch";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PointTable />} />
        <Route path="/fullSchedule" element={<FullMatchSch />} />
        <Route path="/upcoming-matches" element={<UpcomingMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
