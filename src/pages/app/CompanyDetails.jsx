import React from "react";
import { useNavigate } from "react-router";
import { FaRegEdit, FaTrash, FaChevronRight } from "react-icons/fa";

const CompanyDetails = () => {
  const navigate = useNavigate();

  // Static company data
  const company = {
    id: 1,
    name: "Tech Solutions Ltd.",
    industry: "Information Technology",
    description:
      "We provide cutting-edge tech solutions to businesses of all sizes.",
    website: "https://www.techsolutions.com",
    location: "123 Tech Street, Silicon Valley, CA, USA",
    numberOfEmployees: 250,
    verificationStatus: "Pending", // Can be 'Verified' or 'Pending'
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", // example company logo
  };

  const handleBack = () => navigate(-1);
  const handleEdit = () => alert("Edit company details");
  const handleDelete = () =>
    window.confirm("Are you sure you want to delete this company?") &&
    alert("Company deleted");
  const handleVerify = () => alert("Company verification successful!");

  return (
    <div className="p-6 min-h-screen pt-0 text-white">
      {/* Header */}
       <div className="background-gradients relative p-6 rounded-xl shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Company Details</h1>
        </div>
      </div>


      {/* Company Overview */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={company.logo}
          alt={`${company.name} Logo`}
          className="w-32 h-32 rounded-full object-cover shadow-lg border border-gray-700"
        />

        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-semibold text-white">{company.name}</h2>
          <p className="text-gray-400 text-sm">{company.industry}</p>
          <div className="flex items-center gap-3 mt-2">
            <span
              className={`px-4 py-1 rounded-full text-xs font-semibold ${
                company.verificationStatus === "Verified"
                  ? "bg-green-800 text-green-400"
                  : "bg-yellow-800 text-yellow-400"
              }`}
            >
              {company.verificationStatus}
            </span>
            <p className="text-xs text-gray-400">ID: #{company.id}</p>
          </div>
        </div>
      </div>

      {/* Company Summary Grid */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <p className="text-gray-400">Employees</p>
          <p className="font-semibold mt-1 text-white">
            {company.numberOfEmployees}
          </p>
          <p className="text-xs text-gray-400">Active Staff Members</p>
        </div>

        <div>
          <p className="text-gray-400">Industry</p>
          <p className="font-semibold mt-1 text-white">{company.industry}</p>
        </div>

        <div>
          <p className="text-gray-400">Website</p>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold mt-1 text-[#DAB462] block truncate hover:underline"
          >
            {company.website}
          </a>
          <p className="text-xs text-gray-400">Click to visit</p>
        </div>

        <div>
          <p className="text-gray-400">Location</p>
          <p className="font-semibold mt-1 text-white">{company.location}</p>
        </div>
      </div>

      {/* Company Description */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 text-sm">
        <p className="text-gray-400 mb-1">About Company</p>
        <p className="font-semibold text-white leading-relaxed">
          {company.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-6 mt-8">
        <button
          onClick={handleEdit}
          className="px-8 py-3 rounded-xl border border-gray-600 hover:border-[#DAB462] transition text-white flex items-center space-x-3"
        >
          <FaRegEdit />
          <span>Edit</span>
        </button>
        <button
          onClick={handleDelete}
          className="px-8 py-3 rounded-xl bg-red-500 font-semibold hover:bg-red-600 transition text-white flex items-center space-x-3"
        >
          <FaTrash />
          <span>Delete</span>
        </button>
        {/* {company.verificationStatus === "Pending" && (
          <button
            onClick={handleVerify}
            className="px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold transition text-white flex items-center space-x-3"
          >
            <FaChevronRight />
            <span>Verify</span>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default CompanyDetails;
