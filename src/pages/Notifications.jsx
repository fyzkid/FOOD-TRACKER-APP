import { useState } from "react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";

const Notifications = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Milk is expiring today", time: "2 hours ago", color: "red" },
    { id: 2, text: "Bread expires in 2 days", time: "5 hours ago", color: "yellow" },
  ]);

  // Function to delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="w-full h-screen flex flex-col items-center py-20 space-y-5 bg-gray-100">
     <div className="md:w-[80%] mx-auto flex flex-col gap-8">
     <h2 className="text-2xl font-bold">Notifications</h2>

{/* Sort Dropdown */}
<div className=" text-left">
  <select className="p-2 border border-gray-300 rounded-md">
    <option>Sort by Date</option>
    <option>Sort by Urgency</option>
  </select>
</div>

{/* Notifications List */}
<div className="w-[80%] space-y-4  ">
  {notifications.map((notification) => (
    <div
      key={notification.id}
      className="flex justify-between items-center p-4 rounded-md shadow-md bg-white"
    >
      {/* Notification Text */}
      <div className="flex items-center space-x-3">
        <span
          className={`w-3 h-3 rounded-full ${
            notification.color === "red" ? "bg-red-500" : "bg-yellow-500"
          }`}
        ></span>
        <div>
          <p className="font-medium">{notification.text}</p>
          <p className="text-gray-500 text-sm">{notification.time}</p>
        </div>
      </div>

      {/* Icons for Read & Delete */}
      <div className="flex space-x-3">
        <CheckCircleIcon className="w-6 h-6 text-green-600 cursor-pointer hover:text-green-800" />
        <TrashIcon
          className="w-6 h-6 text-gray-600 cursor-pointer hover:text-red-500"
          onClick={() => deleteNotification(notification.id)}
        />
      </div>
    </div>
  ))}
</div>
     </div>
    </div>
  );
};

export default Notifications;
