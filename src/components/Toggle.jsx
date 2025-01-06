import React, { useState } from "react";

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      onClick={handleToggle}
      className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
        isOn ? "bg-green-500" : "bg-gray-500"
      }`}
    >
      <div
        className={`h-4 w-4 bg-white rounded-full shadow-md transform duration-300 ${
          isOn ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}

export default ToggleSwitch;