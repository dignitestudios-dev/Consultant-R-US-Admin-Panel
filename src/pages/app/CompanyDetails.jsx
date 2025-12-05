import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../axios"; // 
import Cookies from "js-cookie";  // Import js-cookie

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const [isApproving, setIsApproving] = useState(false);  // Approving state

  // Retrieve token from cookies
  const token = Cookies.get("token");  // Get token from cookies (replace 'authToken' with the actual key you use)

  // Fetch company info
  const fetchCompany = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/admin/get-contractor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in the header
        },
      });

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

  // Handle approval action (PATCH request)
  const handleApprove = async () => {
    try {
      setIsApproving(true); // Disable button during approval
      const response = await axios.patch(
        `/admin/contractors/${id}/approve`,
        {}, // Empty body (can be adjusted if needed)
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in the header
          },
        }
      );

      if (response.data?.success) {
        setCompany(prevCompany => ({ ...prevCompany, status: 'approved' }));
        setIsModalOpen(false); // Close modal after successful approval
      } else {
        console.error("Approval failed:", response.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error approving company:", error);
    } finally {
      setIsApproving(false); // Re-enable button after completion
    }
  };

  // Open modal on Approve button click
  const openApproveModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen pt-0 animate-pulse">
        {/* Loading skeleton content */}
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
  <div className="absolute top-0 left-0 h-1 w-full button-bg rounded-t-3xl flex justify-between" />
  
  {/* Heading and Actions on the same line */}
  <div className="flex items-center justify-between">
    <h1 className="text-[32px] md:text-[36px] font-bold">Company Details</h1>
    
    {/* Show Approve Button Only If Status is Not "approved" */}
    {company.status !== "approved" && (
      <button
        onClick={openApproveModal}
        className="px-8 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition flex items-center"
      >
        Approve
      </button>
    )}
  </div>
</div>


     

      {/* Overview */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={company.profilePicture || "https://via.placeholder.com/150?text=No+Image"}
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
          <p className="text-white font-semibold">{company.companySize || "N/A"}</p>
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

{/* LICENSE */}
<div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6">
  <p className="text-gray-400 mb-2">Company License</p>

  {company.licence ? (
    <a
      href={company.licence}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <img
        src={company.licence}
        alt="Company License"
        className="w-40 h-40 object-cover rounded-lg border border-gray-700 hover:opacity-80 transition"
      />
      <p className="text-[#DAB462] text-sm mt-2 hover:underline">
        View License Document
      </p>
    </a>
  ) : (
    <p className="text-gray-500">No license uploaded.</p>
  )}
</div>

      

      {/* Approve Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
          <div className="bg-[#1E2430] border border-gray-700 rounded-xl max-w-md w-full p-6 shadow-lg text-white relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Confirm Approval
            </h2>
            <p className="text-lg mb-4">
              Are you sure you want to approve this company?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-xl border border-gray-600 text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-6 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700"
                disabled={isApproving}
              >
                {isApproving ? "Approving..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
