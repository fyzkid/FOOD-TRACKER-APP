import { useState, useEffect } from 'react';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`https://freshtrackapi.onrender.com/api/statistics/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [userId]);

  if (loading) return <p className="text-center">Loading statistics...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center py-20">
      <div className="flex flex-col gap-4 rounded-md p-8 shadow-lg w-[300px] bg-white">
        <h2 className="text-lg font-bold text-center">Statistics</h2>

        <div className="border p-4 rounded-md">
          <h3 className="text-sm font-semibold">Pie Chart (Items Status)</h3>
          <p>Expired: {stats?.pieChart?.expired ?? 0}</p>
          <p>Active: {stats?.pieChart?.active ?? 0}</p>
        </div>

        <div className="border p-4 rounded-md">
          <h3 className="text-sm font-semibold">Line Chart</h3>
          <p>{stats?.lineChart.length ? 'Data available' : 'No data'}</p>
        </div>

        <div className="border p-4 rounded-md">
          <h3 className="text-sm font-semibold">Bar Chart</h3>
          <p>{stats?.barChart.length ? 'Data available' : 'No data'}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
