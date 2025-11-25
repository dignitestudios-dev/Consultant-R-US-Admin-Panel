import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Delete user states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Approve / Reject states
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Fetch user details
  const fetchUser = async () => {
    try {
      const response = await axios.get(`/admin/get-user/${userId}`);
      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  // DELETE USER
  const handleDeleteUser = async () => {
    try {
      setIsDeleting(true);
      const res = await axios.post(`/admin/delete-user/${userId}`);

      if (res.data.success) {
        SuccessToast("User deleted successfully.");
        navigate("/app/users");
      }
    } catch (error) {
      ErrorToast("Failed to delete user.");
    } finally {
      setIsDeleting(false);
    }
  };

  // APPROVE / REJECT USER API
  const handleUpdateStatus = async (status) => {
    try {
      setIsUpdatingStatus(true);

      const res = await axios.post("/admin/approve-reject-user", {
        userId,
        status,
      });

      if (res.data.success) {
        SuccessToast(`User ${status} successfully.`);

        // Close Modals
        setShowApproveModal(false);
        setShowRejectModal(false);

        // Refresh user
        fetchUser();
      }
    } catch (error) {
      ErrorToast("Failed to update user status.");
      console.error(error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // ---------------------------- UI START ----------------------------

  if (isLoading) {
    return (
      <div className="text-white p-6">
        <div className="skeleton-loader w-full h-6 bg-gray-700 mb-4"></div>
        <div className="skeleton-loader w-1/4 h-6 bg-gray-700 mb-4"></div>
        <div className="skeleton-loader w-full h-72 bg-gray-700 mb-4"></div>
        <div className="skeleton-loader w-full h-6 bg-gray-700 mb-2"></div>
        <div className="skeleton-loader w-1/4 h-6 bg-gray-700"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-white p-6">User not found.</div>;
  }

  return (
    <div className="min-h-screen px-6 text-white">

      {/* HEADER */}
      <div className="background-gradients relative mb-4 p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">User Details</h1>

          {/* <button
            onClick={() => navigate(-1)}
            className="text-gray-300 button-bg rounded-md p-4 hover:text-white transition"
          >
            ❮ Back
          </button> */}
        </div>
      </div>

      {/* PROFILE CARD */}
     <div className="bg-[#0C111D] border border-gray-700 rounded-xl p-6 relative flex items-center gap-4">

  {/* Profile Image */}
  {isLoading ? (
    <div className="skeleton-loader w-20 h-20 bg-gray-700 rounded-xl"></div>
  ) : (
    <img
      src={user.signUpRecord.profilePicture}
      alt={user.signUpRecord.fullName}
      className="w-20 h-20 rounded-xl object-cover"
    />
  )}

  {/* Profile text */}
  <div>
    <h2 className="text-xl font-bold">{user.signUpRecord.fullName}</h2>
    <p className="text-gray-400 text-sm">{user.jobTitle}</p>
    <p className="text-gray-400 text-sm">{user.industry}</p>
  </div>

  {/* ⭐ ALL BUTTONS IN ONE GROUP — SIDE BY SIDE ⭐ */}
  <div className="ml-auto flex items-center gap-3">

    {/* Show Approve/Reject only if pending */}
    {user.status === "pending" && (
      <>
        <button
          onClick={() => setShowApproveModal(true)}
          className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-md transition text-white text-sm"
        >
          Approve
        </button>

        <button
          onClick={() => setShowRejectModal(true)}
          className="px-4 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-md transition text-white text-sm"
        >
          Reject
        </button>
      </>
    )}

    {/* Delete Button */}
    <button
      onClick={() => setShowDeleteModal(true)}
      className="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-md transition text-white text-sm"
    >
      Delete User
    </button>

  </div>
</div>


      {/* INFO GRID */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 grid grid-cols-1 gap-6 text-sm">
        <div>
          <p className="text-gray-400">Number</p>
          <p className="font-semibold mt-1">{user.signUpRecord.phone || "N/A"}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-400">Experience</p>
          <p className="font-semibold mt-1">{user.experience} Years</p>
        </div>

        <div>
          <p className="text-gray-400">Preferred Job Type</p>
          <p className="font-semibold mt-1">{user.prefferedJobTypes.join(", ")}</p>
        </div>

        <div>
          <p className="text-gray-400">Availability</p>
          <p className="font-semibold mt-1">
            {new Date(user.availability).toDateString()}
          </p>
          <p className="text-xs text-gray-400">{user.shiftType} Shift</p>
        </div>
       <div>
  <p className="text-gray-400">Status</p>

  <span
    className={`
      px-3 py-1 mt-1 inline-block text-xs font-semibold rounded-full
      ${
        user.status === "approved"
          ? "bg-green-800 text-green-300"
          : user.status === "rejected"
          ? "bg-red-800 text-red-300"
          : "bg-yellow-700 text-yellow-300"
      }
    `}
  >
    {user.status}
  </span>
</div>

      </div>

      {/* ---------------- DELETE MODAL ---------------- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0C111D] border border-gray-700 rounded-xl p-6 w-[90%] max-w-md text-white">

            <h3 className="text-xl font-bold mb-3">Delete User?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteUser}
                className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- APPROVE MODAL ---------------- */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0C111D] border border-gray-700 rounded-xl p-6 w-[90%] max-w-md text-white">

            <h3 className="text-xl font-bold mb-3">Approve User?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to approve this user?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleUpdateStatus("approved")}
                className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
              >
                {isUpdatingStatus ? "Processing..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- REJECT MODAL ---------------- */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0C111D] border border-gray-700 rounded-xl p-6 w-[90%] max-w-md text-white">

            <h3 className="text-xl font-bold mb-3">Reject User?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to reject this user?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-600 hover:border-gray-400 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleUpdateStatus("rejected")}
                className="px-6 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition"
              >
                {isUpdatingStatus ? "Processing..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserDetails;
