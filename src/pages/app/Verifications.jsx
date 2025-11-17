import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaEye, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router";

const Verifications = () => {
  const navigate = useNavigate();

  // State for managing loading state, filtered users, and all users
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // All, Employee, or Company
  const [users, setUsers] = useState([]); // Stores all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Stores filtered users

  // Simulate data fetching
  useEffect(() => {
    // Simulated data for employees and companies
    const users = [
      {
        type: "Employee",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        signupDate: "Jan 12, 2025",
        status: "Pending",
        id: 1,
      },
      {
        type: "Company",
        name: "Tech Innovators Inc.",
        email: "contact@techinnovators.com",
        signupDate: "Feb 8, 2025",
        status: "Pending",
        id: 2,
      },
      {
        type: "Employee",
        name: "John Doe",
        email: "john.doe@example.com",
        signupDate: "Mar 22, 2025",
        status: "Active",
        id: 3,
      },
      {
        type: "Company",
        name: "Creative Solutions Ltd.",
        email: "info@creativesolutions.com",
        signupDate: "Apr 3, 2025",
        status: "Verified",
        id: 4,
      },
    ];

    setTimeout(() => {
      setIsLoading(false); // Simulate data load after 2 seconds
      setUsers(users); // Store all users
      setFilteredUsers(users); // Initially set all users
    }, 2000);
  }, []);

  // Handle filtering based on selected type (Employee, Company, or All)
  const handleFilterChange = (type) => {
    setFilter(type);

    if (type === "All") {
      setFilteredUsers(users); // Show all users
    } else {
      setFilteredUsers(users.filter((user) => user.type === type)); // Filter by type
    }
  };

  // Handle view details action
  const handleViewClick = (user) => {
    const route = user.type === "Employee" 
    //   ? `/app/employee-verification/${user.id}` 
    //   : `/app/company-verification/${user.id}`;
     ? `/app/employee-verification` 
      : `/app/company-verification`;

    navigate(route);
  };

  return (
    <div className="p-6 min-h-screen pt-2">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Filter Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Verification</h1>
          <div className="flex items-center space-x-4">
            {/* Filter Button */}
            <button
              onClick={() => handleFilterChange("All")}
              className={`${
                filter === "All" ? "bg-[#BE8B36] text-white" : "text-gray-300 hover:bg-gray-700"
              } px-4 py-2 rounded-xl border border-gray-700 text-sm transition`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("Employee")}
              className={`${
                filter === "Employee" ? "bg-[#BE8B36] text-white" : "text-gray-300 hover:bg-gray-700"
              } px-4 py-2 rounded-xl border border-gray-700 text-sm transition`}
            >
              Employees
            </button>
            <button
              onClick={() => handleFilterChange("Company")}
              className={`${
                filter === "Company" ? "bg-[#BE8B36] text-white" : "text-gray-300 hover:bg-gray-700"
              } px-4 py-2 rounded-xl border border-gray-700 text-sm transition`}
            >
              Companies
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 background-gradients border  border-gray-700 p-6 rounded-xl mt-6">
        <div className="w-full rounded-xl  overflow-x-auto space-y-4">
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
            <div className="px-4">#</div>
            <div>Name</div>
            <div>Email</div>
            <div>Signup Date</div>
            <div>Status</div>
            <div>Type</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {isLoading
            ? Array(5)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-7 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                  >
                    {/* Shimmer Effect */}
                    <div className="w-8 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-24 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-40 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-24 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-32 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-24 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-20 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                  </div>
                ))
            : filteredUsers.map((user, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-7 gap-4 items-center text-sm text-gray-200 border border-gray-700 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                >
                  <div className="font-medium text-gray-300">{idx + 1}</div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm opacity-80 truncate font-semibold">{user.email}</div>
                  <div className="text-sm">{user.signupDate}</div>
                  <div>
                    <span
                      className={`${
                        user.status === "Pending"
                          ? "text-yellow-400 bg-yellow-800 bg-opacity-30"
                          : "text-green-400 bg-green-800 bg-opacity-30"
                      } px-3 py-1 rounded-full text-xs`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="font-medium text-gray-300">{user.type}</div>
                  <div>
                    <button
                      onClick={() => handleViewClick(user)} // Pass the user object to the handler
                      className="text-white background-gradient p-2 cursor-pointer items-center flex bg-opacity-80 hover:bg-gray-800 rounded-full hover:bg-opacity-100 transition"
                    >
                      <FaEye className="w-4 h-4 mr-2 text-[#DAB462]" /> View Details
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end mt-8 space-x-2">
          {/* Previous Button */}
          <button
            className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition"
            aria-label="Previous Page"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {[1, 2, 3, 4, 5].map((page, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-xl border border-gray-700 text-sm transition ${
                page === 1
                  ? "bg-[#BE8B36] text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            className="p-2 rounded-full border border-gray-700 text-gray-300 hover:bg-[#BE8B36] hover:text-white transition"
            aria-label="Next Page"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verifications;
