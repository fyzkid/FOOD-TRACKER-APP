import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const Statistics = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = sessionStorage.getItem('currentUser');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expiredResponse = await fetch(`https://freshtrackapi.onrender.com/api/items/expired`);
        const expiredData = await expiredResponse.json();

        const activeResponse = await fetch(`https://freshtrackapi.onrender.com/api/items/not-expired`);
        const activeData = await activeResponse.json();

        setExpiredItems(expiredData);
        setActiveItems(activeData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (!expiredItems.length && !activeItems.length) return <p>Error loading data</p>;

  const pieData = [
    { name: "Expired", value: expiredItems.length },
    { name: "Active", value: activeItems.length },
  ];

  const barChartData = [...activeItems, ...expiredItems].map((item) => ({
    itemName: item.name,
    count: 1,
  }));

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
