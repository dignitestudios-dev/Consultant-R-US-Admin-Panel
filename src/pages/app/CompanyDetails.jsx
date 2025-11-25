import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import axios from "../../axios"; // <-- using your axios.js EXACTLY as exported

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch company info
  const fetchCompany = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/admin/get-contractor/${id}`);

      if (res.data?.success) {
        setCompany(res.data.data);
      }
    } catch (err) {
      console.log("Error fetching company:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const handleEdit = () => alert("Edit company details");
  const handleDelete = () =>
    window.confirm("Are you sure you want to delete this company?") &&
    alert("Company deleted");

  if (loading) {
  return (
    <div className="p-6 min-h-screen pt-0 animate-pulse">

      {/* Header Skeleton */}
      <div className="background-gradients p-6 rounded-xl border border-gray-700 mt-4 relative">
        <div className="absolute top-0 left-0 h-1 w-full button-bg rounded-t-3xl" />
        <div className="h-8 w-48 bg-gray-700 rounded"></div>
      </div>

      {/* Overview Skeleton */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        
        {/* Circular Avatar Skeleton */}
        <div className="w-32 h-32 rounded-full bg-gray-700 border border-gray-600"></div>

        <div className="flex flex-col gap-3 w-full">
          <div className="h-6 w-52 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>

          <div className="flex items-center gap-3 mt-3">
            <div className="h-5 w-20 bg-gray-700 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        {[1,2,3,4].map((i)=>(
          <div key={i} className="space-y-2">
            <div className="h-4 w-20 bg-gray-700 rounded"></div>
            <div className="h-5 w-32 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Description Skeleton */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 space-y-3">
        <div className="h-4 w-32 bg-gray-700 rounded"></div>
        <div className="h-5 w-full bg-gray-600 rounded"></div>
        <div className="h-5 w-3/4 bg-gray-600 rounded"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex justify-end gap-6 mt-8">
        <div className="h-10 w-28 bg-gray-700 rounded-xl"></div>
        <div className="h-10 w-28 bg-gray-700 rounded-xl"></div>
      </div>
    </div>
  );
}


  if (!company) {
    return (
      <div className="p-6 text-center text-red-400 mt-20">
        Company not found.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen pt-0 text-white">
      {/* Header */}
      <div className="background-gradients p-6 rounded-xl border border-gray-700 mt-4 relative">
        <div className="absolute top-0 left-0 h-1 w-full button-bg rounded-t-3xl" />
        <h1 className="text-[32px] md:text-[36px] font-bold">
          Company Details
        </h1>
      </div>

      {/* Overview */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={
            company.profilePicture ||
            "https://via.placeholder.com/150?text=No+Image"
          }
          className="w-32 h-32 rounded-full object-cover border border-gray-700 shadow"
          alt="Company Logo"
        />

        <div>
          <h2 className="text-3xl font-semibold">{company.companyName}</h2>
          <p className="text-gray-400 text-sm">{company.industryFocus}</p>

          <div className="flex items-center gap-3 mt-3">
            <span
              className={`px-4 py-1 text-xs font-semibold rounded-full ${
                company.status === "approved"
                  ? "bg-green-800 text-green-400"
                  : "bg-yellow-800 text-yellow-400"
              }`}
            >
              {company.status}
            </span>
            <p className="text-xs text-gray-400">ID: {company._id}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">

        <div>
          <p className="text-gray-400">Email</p>
          <p className="text-white font-semibold">{company.email}</p>
        </div>

        <div>
          <p className="text-gray-400">Company Size</p>
          <p className="text-white font-semibold">
            {company.companySize || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-gray-400">Website</p>
          <a
            href={company.webUrl?.[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#DAB462] hover:underline block truncate max-w-[140px]"
          >
            {company.webUrl?.[0] || "No Website"}
          </a>
        </div>

        <div>
          <p className="text-gray-400">Location</p>
          <p className="text-white font-semibold">
            {company.city}, {company.state}, {company.country}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6">
        <p className="text-gray-400 mb-2">About Company</p>
        <p className="text-white font-semibold">
          {company.description || "No description available."}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-6 mt-8">
        {/* <button
          onClick={handleEdit}
          className="px-8 py-3 rounded-xl border border-gray-600 hover:border-[#DAB462] transition flex items-center gap-3"
        >
          <FaRegEdit />
          Edit
        </button> */}

        {/* <button
          onClick={handleDelete}
          className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition flex items-center gap-3"
        >
          <FaTrash />
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default CompanyDetails;
