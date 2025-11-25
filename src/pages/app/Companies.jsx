import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "../../axios";

const Companies = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/admin/get-contractors?page=${page}`);

      if (response.data?.success) {
        setCompanies(response.data.data);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  const handleViewClick = (id) => {
    navigate(`/app/company-details/${id}`);
  };

  return (
    <div className="p-6 min-h-screen pt-2">
      
      {/* HEADER */}
        <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Company Management</h1>
        </div>
      </div>

      {/* GRID LAYOUT — 3 PER ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

        {/* LOADING SKELETON */}
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="h-[160px] bg-[#0B0D11] border border-[#1A1D23] rounded-xl animate-pulse"
                ></div>
              ))
          : companies.length === 0
          ? (
            <p className="text-gray-400 col-span-full text-center">No companies found.</p>
          )
          : companies.map((company, idx) => (
              <div
                key={company._id}
                className="
                  group
                  background-gradients
                  border border-[#1A1D23]
                  rounded-xl
                  p-6
                  flex items-center gap-6
                  shadow-[0_0_20px_rgba(0,0,0,0.15)]
                  hover:shadow-[0_6px_22px_rgba(0,0,0,0.35)]
                  transition-all duration-300
                "
              >
                {/* COMPANY LOGO */}
                <img
                  src={
                    company.profilePicture ||
                    'https://via.placeholder.com/100?text=No+Logo'
                  }
                  className="
                    w-20 h-20 
                    rounded-xl 
                    object-cover 
              border-2 border-gray-700
                    group-hover:scale-105 
                    transition mb-12
                  "
                  alt="Company Logo"
                />

                {/* TEXT CONTENT */}
                <div className="flex-1">
                  {/* Name */}
                  <h2 className="text-lg font-semibold text-white truncate">
                    {company.companyName}
                  </h2>

                  {/* Email */}
                  <p className="text-sm text-gray-400 truncate">{company.email}</p>

                  {/* Status */}
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`
                        px-3 py-1 text-xs font-semibold rounded-full
                        ${
                          company.status === "approved"
                            ? "bg-green-900/40 text-green-400 border border-green-700"
                            : "bg-yellow-900/40 text-yellow-400 border border-yellow-700"
                        }
                      `}
                    >
                      {company.status}
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-end items-center mt-4">
                   

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

      {/* PAGINATION */}
      <div className="flex items-center justify-end mt-10 gap-3">
        
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="
            p-2 
            border border-[#1A1D23] 
            rounded-full 
            text-gray-300 
            hover:bg-[#DAB462] hover:text-black 
            transition
          "
        >
          <FaChevronLeft />
        </button>

        <div className="px-4 py-2 bg-[#DAB462] text-black rounded-xl border border-[#1A1D23]">
          {page}
        </div>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="
            p-2 
            border border-[#1A1D23] 
            rounded-full 
            text-gray-300 
            hover:bg-[#DAB462] hover:text-black 
            transition
          "
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Companies;
