import React, { useState } from "react";
import axios from "../axios";  // Your axios instance
import Cookies from "js-cookie";  // For authentication token
import { SuccessToast, ErrorToast } from "../components/global/Toaster"; // Optional: Toasts for feedback



const NotificationsModal = ({ isOpen, onClose, refetchNotifications }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false); // For handling loading state
  

  if (!isOpen) return null;

  const handleCreate = async () => {
    // Prepare the notification data
    const notificationData = {
      title,
      description,
      metadata: null,  // You can modify metadata if required
    };

    try {
      setLoading(true);  // Set loading to true when the request is in progress

      // Get the token from cookies
      const token = Cookies.get("token");

      // Make the POST request to create the notification
      const response = await axios.post("/admin/create-push-notification", notificationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // On success, show success toast and close the modal
        SuccessToast("Notification created successfully!");
        refetchNotifications();  // Refetch the notifications list
        onClose();
      } else {
        // On failure, show error toast
        ErrorToast(response.data.message || "Failed to create notification");
      }
    } catch (error) {
      console.error("Error creating notification", error);
      ErrorToast("An error occurred while creating the notification.");
    } finally {
      setLoading(false);  // Set loading to false when the request is complete
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4">
      <div className="background-gradient border border-gray-700 rounded-xl max-w-md w-full p-6 shadow-lg text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition text-xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Create New Notification</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm mb-1 text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 text-white placeholder-gray-400"
              rows="4"
              required
            />
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-600 hover:border-[#DAB462] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}  // Disable button while loading
              className={`px-6 py-2 rounded-lg button-bg text-white font-semibold hover:bg-[#b8860b] transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationsModal;
