import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const Statistics = () => {
  // State for data and loading status
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API Call (Replace with your real  API )
    setTimeout(() => {
      setData({
        categories: {
          Fruits: 5,
          Vegetables: 8,
          Medicine: 4,
          Bakery: 6,
          Drink: 9,
        },
        expiryTrends: [
          { date: "Feb 10", expired: 2 },
          { date: "Feb 11", expired: 5 },
          { date: "Feb 12", expired: 3 },
          { date: "Feb 13", expired: 7 },
          { date: "Feb 14", expired: 10 },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p className="text-center text-xl font-semibold">Loading statistics...</p>;
  if (!data) return <p className="text-center text-xl text-red-500">Error loading data</p>;

  // Pie Chart Data (Category Breakdown)
  const pieData = Object.entries(data.categories).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  const COLORS = ["#FF5733", "#33FF57", "#FFC300", "#C70039"];

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Inventory Statistics</h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        
        {/* Pie Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📌 Category Distribution</h3>
          <div className="w-full max-w-sm">
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
        </div>

        {/* Line Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📌 Expired Items Over Time</h3>
          <div className="w-full max-w-sm">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.expiryTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expired" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Statistics;






































// import { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

// const Statistics = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const currentUser = sessionStorage.getItem("currentUser");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://freshtrackapi.onrender.com/api/statistics/${currentUser}`);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching statistics:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p className="text-center text-xl">Loading statistics...</p>;
//   if (!data) return <p className="text-center text-xl text-red-500">Error loading data</p>;

//   // Pie Chart Data - Categorizing inventory into Fruits, Vegetables, etc.
//   const pieData = [
//     { name: "Fruits", value: data.categories.fruits },
//     { name: "Vegetables", value: data.categories.vegetables },
//     { name: "Dairy", value: data.categories.dairy },
//     { name: "Meat", value: data.categories.meat },
//   ];

//   const COLORS = ["#FF5733", "#33FF57", "#FFC300", "#C70039"]; // Pie chart colors

//   // Line Chart Data - Tracking expired items over time
//   const lineChartData = data.expiryTrends.map((item) => ({
//     date: item.date,
//     expired: item.count,
//   }));

//   return (
//     <div className="w-screen h-screen flex flex-col items-center py-10 space-y-10 bg-gray-100">
//       <h2 className="text-3xl font-bold text-gray-800">Inventory Statistics</h2>

//       {/* Pie Chart - Categories of Items */}
//       <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-lg font-semibold text-gray-700 text-center">Category Distribution</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Line Chart - Expiry Tracking Over Time */}
//       <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
//         <h3 className="text-lg font-semibold text-gray-700 text-center">Expired Items Over Time</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={lineChartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="expired" stroke="#8884d8" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Statistics;
