import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const Statistics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = sessionStorage.getItem('currentUser');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://freshtrackapi.onrender.com/api/statistics/${currentUser}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (!data) return <p>Error loading data</p>;

  const pieData = [
    { name: "Expired", value: data.pieChart.expired },
    { name: "Active", value: data.pieChart.active },
  ];

  const COLORS = ["#FF5733", "#33FF57"]; // Colors for Pie Chart

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center py-20 space-y-10">
      <h2 className="text-2xl font-bold">Statistics</h2>

      {/* Pie Chart */}
      <div className="w-1/2 flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="w-3/4 flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.barChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="itemName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
