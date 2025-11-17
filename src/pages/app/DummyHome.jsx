import React, { useState } from "react";
import {
  FaUsers,
  FaDollarSign,
  FaCalendarCheck,
  FaClipboardList,
  FaEye,
  FaChevronRight,
  FaChevronLeft,
  FaFileContract,
  FaBell,
  FaCog,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router";
import { FaBuilding } from "react-icons/fa";

const DummyHome = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/app/users');
  };

  // Stats
  const stats = {
    activeUsers: 10587,
    jobPostings: 3421,
    contracts: 1284,
    notifications: 15,
  };

  // Line Chart Data (for Revenue by Users)
  const lineData = [
    { name: "Jan", Users: 100, Listers: 50 },
    { name: "Feb", Users: 200, Listers: 150 },
    { name: "Mar", Users: 300, Listers: 180 },
    { name: "Apr", Users: 350, Listers: 200 },
    { name: "May", Users: 400, Listers: 250 },
    { name: "Jun", Users: 500, Listers: 300 },
    { name: "Jul", Users: 600, Listers: 400 },
    { name: "Aug", Users: 735, Listers: 500 },
    { name: "Sep", Users: 650, Listers: 480 },
    { name: "Oct", Users: 700, Listers: 520 },
    { name: "Nov", Users: 720, Listers: 540 },
    { name: "Dec", Users: 800, Listers: 600 },
  ];

  // Bar Chart Data for Subscription Distribution
  const subscriptionData = [
    { plan: "Basic", subscribers: 120 },
    { plan: "Standard", subscribers: 90 },
    { plan: "Premium", subscribers: 60 },
  ];

  const handleViewClick = () => {
    // Navigate to the /app/user-details page
    navigate('/app/user-details');
  };

  const statCards = [
    { title: "Active Users", value: stats.activeUsers, icon: <FaUsers />, color: "#DAB462" },
    { title: "Job Postings", value: stats.jobPostings, icon: <FaClipboardList />, color: "#DAB462" },
    { title: "Contracts", value: stats.contracts, icon: <FaFileContract />, color: "#DAB462" },
    { title: "Notifications", value: stats.notifications, icon: <FaBell />, color: "#DAB462" },
  ];

  return (
    <div className="p-6 pt-2 w-full space-y-6 h-screen">
      {/* Heading */}
      <div className="relative p-6 rounded-2xl text-white shadow-lg border border-gray-700 overflow-hidden mt-4">
  {/* Accent Bar */}
  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#B37C26] to-[#DAB462] rounded-t-xl"></div>

  {/* Main Content */}
  <div className="flex items-center justify-between space-x-4">
    {/* Left Section */}
    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100">Dashboard</h1>
      <p className="text-sm md:text-base text-gray-300 mt-1">Overview of your data</p>
    </div>

    {/* Right Icon Section (Optional) */}
    <div className="flex items-center space-x-2">
      {/* You can add any icon or custom content here, e.g., a settings icon */}
      <button className="p-2 rounded-full bg-gray-800  transition duration-300">
        <FaCog className="w-5 h-5 text-[#DAB462]" />
      </button>
    </div>
  </div>
</div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-6 background-gradients tex-white rounded-xl shadow-lg hover:shadow-2xl transition relative"
          >
            <div className="w-16 h-16 flex items-center justify-center button-bg rounded-md mb-4">
              <div className="text-2xl text-white">{card.icon}</div>
            </div>
            <h3 className="text-sm opacity-80 text-white mb-1">{card.title}</h3>
            <p className="text-2xl text-white font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bar Chart - Revenue by Users */}
          <div className="background-gradients border border-gray-700 rounded-xl p-6 col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-white">Revenue by Users</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#B37C26" />
                <Bar dataKey="Listers" fill="#DAB462" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart for Subscription Distribution */}
          <div className="background-gradients border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-8 text-white">Subscription Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subscriptionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="plan" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="subscribers" fill="#B37C26" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      {/* Recent Users Section */}
      <div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-white">Users Management</h3>
          <button
            onClick={handleViewAll}
            className="text-sm text-[#DAB462] hover:underline transition"
          >
            View All
          </button>
        </div>

        {/* User Table */}
        <div className="w-full rounded-xl overflow-x-auto space-y-4">
          <div className="grid grid-cols-6 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
            <div className="px-4">#</div>
            <div>Name</div>
            <div>Email</div>
            <div>Signup Date</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="grid grid-cols-6 gap-4 items-center text-sm text-gray-200 border border-gray-700 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
              >
                <div className="font-medium text-gray-300">{idx + 1}</div>
                <div className="font-semibold">John Doe</div>
                <div className="text-sm opacity-80 truncate font-semibold">john{idx}@example.com</div>
                <div className="text-sm">Oct {10 + idx}, 2025</div>
                <div>
                  <span className="text-green-400 bg-green-800 bg-opacity-30 px-3 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div>
                  <button onClick={handleViewClick} className="text-white border border-gray-700 bg-gray-900 p-2 cursor-pointer items-center flex bg-opacity-80  rounded-full hover:bg-opacity-100 transition">
                    <FaEye className="w-4 h-4 mr-2 text-[#DAB462]" /> View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-8 space-x-2">
        <button className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition" aria-label="Previous Page">
          <FaChevronLeft className="w-4 h-4" />
        </button>
        {[1, 2, 3, 4, 5].map((page, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-xl border border-gray-700 text-sm transition ${
              page === 1 ? "bg-[#BE8B36] text-white" : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition" aria-label="Next Page">
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DummyHome;
