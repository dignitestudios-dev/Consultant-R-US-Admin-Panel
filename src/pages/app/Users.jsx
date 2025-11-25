import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "../../axios";

const Users = () => {
  const navigate = useNavigate();
  const paginationRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState({
    itemsPerPage: 20,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        // `/admin/admin-dashboard?page=${page}&limit=${pagination.itemsPerPage}`
                `/admin/admin-dashboard`

      );

      const data = response.data.data;
      const serverPagination = data.pagination;

      setUsers(data.users || []);
      setActiveUsers(data.activeUsers || 0);

      setPagination((prev) => ({
        ...prev,
        itemsPerPage: serverPagination.itemsPerPage || prev.itemsPerPage,
        currentPage: serverPagination.currentPage || 1,
        totalPages: serverPagination.totalPages > 0 ? serverPagination.totalPages : 1,
        totalItems: serverPagination.totalItems || 0,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.currentPage);
  }, []);

  const handleViewClick = (userId) => {
    navigate(`/app/user-details/${userId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUsers(newPage);
    }
  };

  // Smooth scroll effect like Netflix
  const scrollPagination = (direction) => {
    if (!paginationRef.current) return;
    paginationRef.current.scrollBy({
      left: direction === "left" ? -150 : 150,
      behavior: "smooth",
    });
  };

  return (
    <div className="p-6 min-h-screen pt-2">
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Users Management</h1>
        </div>
      </div>

      <div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-6">
        <div className="w-full rounded-xl overflow-x-auto space-y-4">

          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
            <div className="px-4">#</div>
            <div>Profile</div>
            <div>Email</div>
            <div>Gender</div>
            <div>Actions</div>
          </div>

          {/* Table Rows */}
          {isLoading
            ? Array(pagination.itemsPerPage)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-5 gap-4 items-center text-sm text-gray-200 bg-gray-800 bg-opacity-40 p-4 rounded-lg"
                  >
                    <div className="w-8 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 animate-pulse rounded-full"></div>
                      <div className="w-24 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    </div>
                    <div className="w-40 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-24 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                    <div className="w-20 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
                  </div>
                ))
            : users.map((user, idx) => (
                <div
                  key={user._id}
                  className="grid grid-cols-5 gap-4 items-center text-sm text-gray-200 border border-gray-700 bg-gray-800 bg-opacity-40 p-4 rounded-lg hover:bg-opacity-60 transition"
                >
                  <div className="font-medium text-gray-300">
                    {(pagination.currentPage - 1) * pagination.itemsPerPage + idx + 1}
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={user.signUpRecord.profilePicture}
                      alt={user.signUpRecord.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-semibold">{user.signUpRecord.fullName}</span>
                  </div>

                  <div className="text-sm opacity-80 truncate font-semibold">
                    {user.email}
                  </div>

                  <div className="text-sm capitalize">{user.signUpRecord.gender}</div>

                  <div>
                    <button
                      onClick={() => handleViewClick(user._id)}
                      className="text-white background-gradient p-2 flex items-center bg-opacity-80 hover:bg-gray-800 rounded-full transition"
                    >
                      <FaEye className="w-4 h-4 mr-2 text-[#DAB462]" /> View Details
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* MODERN NETFLIX-STYLE PAGINATION */}
        {/* <div className="relative mt-8 flex items-center justify-center">

          <button
            onClick={() => scrollPagination("left")}
            className="p-2 absolute left-0 bg-[#0C111D] border border-gray-700 text-gray-300 rounded-full hover:bg-[#BE8B36] hover:text-white transition"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={paginationRef}
            className="flex space-x-3 overflow-x-auto no-scrollbar px-12 py-2 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {Array.from(
              { length: pagination.totalPages > 0 ? pagination.totalPages : 1 },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-xl border border-gray-700 whitespace-nowrap transition ${
                  page === pagination.currentPage
                    ? "bg-[#BE8B36] text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollPagination("right")}
            className="p-2 absolute right-0 bg-[#0C111D] border border-gray-700 text-gray-300 rounded-full hover:bg-[#BE8B36] hover:text-white transition"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>

        </div> */}
      </div>
    </div>
  );
};

export default Users;
