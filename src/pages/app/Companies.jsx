import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";
import axios from "../../axios"; // <-- using axios.js

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
      {/* Title */}
      <div className="background-gradients relative p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
        <h1 className="text-[32px] md:text-[36px] font-bold">Companies Management</h1>
      </div>

      {/* Table */}
    <div className="mb-4 background-gradients border border-gray-700 p-6 rounded-xl mt-6">
  <div className="w-full rounded-xl overflow-x-auto space-y-4">

    {/* Header – back to 6 columns */}
    <div className="grid grid-cols-7 gap-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-600 pb-4">
      <div>#</div>
      <div className="col-span-2">Company Name</div>
      <div>Email</div>
      <div>Joined Date</div>
      <div>Status</div>
      <div>Actions</div>
    </div>

    {/* Loading Skeleton – also 6 columns */}
    {isLoading ? (
      Array(5).fill(0).map((_, idx) => (
        <div
          key={idx}
          className="grid grid-cols-7 gap-4 bg-gray-800 bg-opacity-40 p-4 rounded-lg animate-pulse"
        >
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="flex items-center space-x-3 col-span-2">
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            <div className="h-6 bg-gray-700 rounded flex-1"></div>
          </div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
        </div>
      ))
    ) : companies.length === 0 ? (
      <p className="text-gray-400 text-center py-6">No companies found.</p>
    ) : (
      companies.map((company, index) => (
        <div
          key={company._id}
          className="grid grid-cols-7 gap-4 text-sm text-gray-200 border border-gray-700 bg-gray-800 bg-opacity-40 p-4 rounded-lg items-center"
        >
          {/* # */}
          <div>{index + 1}</div>

          {/* Company Name (Logo + Name) */}
          <div className="flex items-center space-x-2 col-span-2">
            <img
              src={
                company.profilePicture ||
                "https://via.placeholder.com/40?text=No+Img"
              }
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover border border-gray-700"
            />
            <span className="font-semibold truncate">{company.companyName}</span>
          </div>

          {/* Email */}
          <div className="truncate">{company.email}</div>

          {/* Joined Date */}
          <div>{new Date(company.createdAt).toLocaleDateString()}</div>

          {/* Status */}
          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                company.status === "approved"
                  ? "bg-green-800 text-green-300"
                  : "bg-yellow-800 text-yellow-300"
              }`}
            >
              {company.status}
            </span>
          </div>

          {/* Actions */}
          <div>
            <button
              onClick={() => handleViewClick(company._id)}
              className="flex items-center text-white px-3 py-2 rounded-full background-gradient"
            >
              <FaEye className="mr-2 text-[#DAB462]" />
              View Details
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Pagination */}
  <div className="flex items-center justify-end mt-8 space-x-2">
    <button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      className="p-2 border border-gray-700 rounded-full text-gray-300 hover:bg-[#BE8B36]"
    >
      <FaChevronLeft />
    </button>

    <div className="px-4 py-2 bg-[#BE8B36] text-white rounded-xl border border-gray-700">
      {page}
    </div>

   <button
  onClick={() => setPage((p) => p + 1)}
  className="p-2 border border-gray-700 rounded-full text-gray-300 hover:bg-[#BE8B36]"
>
  <FaChevronRight />
</button>

  </div>
</div>

    </div>
  );
};

export default Companies;
