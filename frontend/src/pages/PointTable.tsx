import React from "react";

const PointTable = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-6">
        IPL 2025 Points Table
      </h1>
      <table className="min-w-2/3 mx-auto bg-white border border-gray-300 rounded-2xl shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Position</th>
            <th className="py-2 px-4 border-b">Team</th>
            <th className="py-2 px-4 border-b">Matches Played</th>
            <th className="py-2 px-4 border-b">Wins</th>
            <th className="py-2 px-4 border-b">Losses</th>
            <th className="py-2 px-4 border-b">Points</th>
            <th className="py-2 px-4 border-b">Net Run Rate</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Data */}
          {Array.from({ length: 10 }, (_, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 text-center">{index + 1}</td>
              <td className="py-2 px-4 text-center">
                Team {index + 1}
              </td>
              <td className="py-2 px-4 text-center">
                {Math.floor(Math.random() * 10)}
              </td>
              <td className="py-2 px-4 text-center">
                {Math.floor(Math.random() * 10)}
              </td>
              <td className="py-2 px-4 text-center">
                {Math.floor(Math.random() * 10)}
              </td>
              <td className="py-2 px-4 text-center">
                {Math.floor(Math.random() * 20)}
              </td>
              <td className="py-2 px-4 text-center">
                {(Math.random() * 2 - 1).toFixed(2)}
              </td>
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

export default PointTable;
