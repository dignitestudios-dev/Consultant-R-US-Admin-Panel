import React, { useState, useEffect } from "react";
import axios from "../../axios"; // Your axios instance
import { Trash2 } from "lucide-react";
import NotificationsModal from "../../components/NotificationsModal";
import { ErrorToast } from "../../components/global/Toaster"; // Optional: for error handling

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Skeleton card */}
      <div className="flex flex-col bg-gray-700 p-6 rounded-xl">
        <div className="h-6 bg-gray-600 w-3/4 mb-4"></div> {/* Title Skeleton */}
        <div className="h-4 bg-gray-600 w-5/6 mb-2"></div> {/* Description Skeleton */}
        <div className="flex justify-between">
          <div className="h-3 bg-gray-600 w-1/4"></div> {/* Date Skeleton */}
          <div className="h-3 bg-gray-600 w-1/6"></div> {/* Button Skeleton */}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/admin/get-admin-notifications");
      if (response.data.success) {
        setNotifications(response.data.data);
      } else {
        ErrorToast(response.data.message || "Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications", error);
      ErrorToast("An error occurred while fetching notifications.");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchNotifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to open the modal
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen pt-2 text-white">
      {/* Header */}
      <div className="background-gradients relative p-6 rounded-xl shadow-md border border-gray-700 overflow-hidden mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        <h1 className="text-[32px] md:text-[36px] font-bold mb-4 md:mb-0">
          Notifications
        </h1>

        <div className="flex text-white rounded-lg shadow p-1 button-bg">
          <button
            onClick={handleCreateClick}
            className="px-6 py-1 rounded-lg font-medium flex items-center gap-2"
          >
            <span className="text-2xl">+</span>
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* Notifications Cards */}
      <section className="mt-6 background-gradients border border-gray-700 p-6 rounded-xl space-y-6">
        {loading ? (
          // Show Skeleton Loader while data is loading
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="background-gradient border border-gray-700 p-6 rounded-xl hover:bg-opacity-80 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-gray-200">
                  {notification.title}
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </div>
              </div>
              <p className="mt-2 text-gray-300">{notification.description}</p>
              <div className="flex justify-end">
                <button
                  className="text-red-500 hover:text-red-400 transition"
                  onClick={() => alert(`Delete Notification ${notification._id}`)} // handle delete here
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Modal */}
      <NotificationsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        refetchNotifications={fetchNotifications} // Pass the refetch function here
      />
    </div>
  );
};

export default Notifications;
