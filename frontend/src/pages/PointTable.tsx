import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchPointsTable } from "../store/pointsTableSlice";

const PointTable = () => {
  const dispatch = useAppDispatch();
  const {
    data: pointsData,
    loading,
    error,
  } = useAppSelector((state) => state.pointsTable);

  useEffect(() => {
    dispatch(fetchPointsTable());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  console.log("Points Data:", pointsData);
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
          {pointsData.map((team) => (
            <tr
              key={`${team.team}-${team.position}`}
              className="hover:bg-gray-100"
            >
              <td className="py-2 px-4 text-center">{team.position}</td>
              <td className="py-2 px-4 flex items-center justify-center space-x-2">
                <img
                  src={team.teamLogo || null}
                  alt={team.team}
                  className="w-8 h-8 object-contain"
                />
                <span>{team.team}</span>
              </td>
              <td className="py-2 px-4 text-center">{team.played}</td>
              <td className="py-2 px-4 text-center">{team.wins}</td>
              <td className="py-2 px-4 text-center">{team.losses}</td>
              <td className="py-2 px-4 text-center">{team.points}</td>
              <td className="py-2 px-4 text-center">{team.nrr}</td>
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
