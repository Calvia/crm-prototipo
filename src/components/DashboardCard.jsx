import React from 'react';

const DashboardCard = ({ icon: Icon, title, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
    indigo: "bg-indigo-500 text-white",
    red: "bg-red-500 text-white",
    yellow: "bg-yellow-500 text-white"
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-full ${colorClasses[color]} shadow-lg`}>
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default DashboardCard;
