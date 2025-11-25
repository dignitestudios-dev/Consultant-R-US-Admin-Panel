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

     {/* USER CARDS */}
{/* MODERN USER CARDS */}
{/* 3 HORIZONTAL CARDS PER ROW */}
<div className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3    /* 👈 EXACTLY 3 PER ROW */
  gap-8 
  mt-10
">

  {isLoading
    ? Array(pagination.itemsPerPage)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="h-[140px] background-gradients  rounded-xl border border-[#1A1D23] animate-pulse"
          ></div>
        ))
    : users.map((user, idx) => (
        <div
          key={user._id}
          className="
            group
            background-gradients 
            border border-[#1A1D23]
            rounded-xl
            p-5
            flex
            items-center
            gap-6
            shadow-[0_0_20px_rgba(0,0,0,0.15)]
            hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
            transition-all duration-300
            h-[160px]    /* 👈 Keeps height consistent */
          "
        >
          {/* Avatar */}
          <img
            src={user.signUpRecord.profilePicture}
            className="
              w-24 h-24 
              rounded-xl object-cover 
              shadow-sm
              group-hover:scale-[1.03] 
              transition
              border-2 border-gray-700 
            "
          />

          {/* Right Content */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">
              {user.signUpRecord.fullName}
            </h2>

            <p className="text-sm text-gray-400">{user.email}</p>

            {/* <p className="text-[12px] text-gray-500 mt-1 uppercase tracking-wide">
              {user.signUpRecord.gender}
            </p> */}

            <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`
                        px-3 py-1 text-xs font-semibold rounded-full
                        ${
                          user.status === "approved"
                            ? "bg-green-900/40 text-green-400 border border-green-700"
                            : "bg-yellow-900/40 text-yellow-400 border border-yellow-700"
                        }
                      `}
                    >
                      {user.status}
                    </span>
                  </div>

            {/* Footer */}
            <div className="flex justify-end items-center ">
             

             <button
                                   onClick={() => handleViewClick(company._id)}
                                   className="
                                     flex items-center gap-2
                                     text-sm px-3 py-1.5
                                     rounded-md
                                     border border-[#2A2D33]
                                     text-gray-300
                                     hover:border-[#DAB462]
                                     hover:text-[#DAB462]
                                     transition
                                   "
                                 >
                                   <FaEye className="text-[#DAB462]" />
                                   View Details
                                 </button>
            </div>
          </div>
        </div>
      ))}
</div>


    </div>
  );
};

export default Users;
