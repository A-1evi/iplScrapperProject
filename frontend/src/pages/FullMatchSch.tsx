import React from "react";

const FullMatchSch = () => {
  return (
    <div className="container p-4 mt-3">
      <h1 className="text-3xl font-bold text-center mb-6">
        IPL 2025 Full Match Schedule
      </h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Match No.</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Home Team</th>
            <th className="py-2 px-4 border-b">Away Team</th>
            <th className="py-2 px-4 border-b">Venue</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data */}
          {Array.from({ length: 10 }, (_, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 text-center">{index + 1}</td>
              <td className="py-2 px-4 text-center">
                {new Date().toLocaleDateString()}
              </td>
              <td className="py-2 px-4 text-center">
                {new Date().toLocaleTimeString()}
              </td>
              <td className="py-2 px-4 text-center">Team A</td>
              <td className="py-2 px-4 text-center">Team B</td>
              <td className="py-2 px-3 text-center">City {index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          For more details, visit the official IPL website.
        </p>
      </div>
    </div>
  );
};

export default FullMatchSch;
