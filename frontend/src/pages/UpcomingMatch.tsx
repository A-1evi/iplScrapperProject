import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchFixtures } from "../store/fixtureSlice";

const UpcomingMatch = () => {
  const dispatch = useAppDispatch();
  const {
    data: fixtures,
    loading,
    error,
  } = useAppSelector((state) => state.fixtures);

  useEffect(() => {
    dispatch(fetchFixtures());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        IPL 2025 Match Schedule
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {fixtures.map((match) => (
          <div
            key={match.matchNo}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-sm text-gray-600 mb-2">
              Match {match.matchNo}
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 flex-1">
                <img
                  src={match.team1Logo || "/placeholder.png"}
                  alt={match.team1}
                  className="w-12 h-12 object-contain"
                />
                <span className="font-semibold text-lg">{match.team1}</span>
              </div>
              <div className="text-center px-4">
                <span className="text-xl font-bold">VS</span>
              </div>
              <div className="flex items-center space-x-3 flex-1 justify-end">
                <span className="font-semibold text-lg">{match.team2}</span>
                <img
                  src={match.team2Logo || "/placeholder.png"}
                  alt={match.team2}
                  className="w-12 h-12 object-contain"
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold">
                    {new Date(match.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Time</p>
                  <p className="font-semibold">{match.time}</p>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-gray-600">Venue</p>
                <p className="font-semibold">{match.venue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {fixtures.length === 0 && (
        <div className="text-center mt-8 text-gray-600">
          No matches scheduled.
        </div>
      )}
    </div>
  );
};

export default UpcomingMatch;
