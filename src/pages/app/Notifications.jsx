import React, { useState, useEffect } from "react";
import axios from "../../axios"; // Your axios instance
import { Clock, Trash2 } from "lucide-react";
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
  className="relative bg-gray-800/40 backdrop-blur-md border border-gray-700 
             p-5 rounded-2xl hover:bg-gray-800/60 hover:border-gray-600 
             transition-all duration-300 group"
>
  {/* Top Row */}
  <div className="flex justify-between items-start">
    <div>
      <h2 className="text-[20px] font-semibold text-white leading-tight">
        {notification.title}
      </h2>
      
    </div>
    <p className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
  <Clock size={14} className="text-gray-500" />
  {new Date(notification.createdAt).toLocaleString()}
</p>

    {/* Delete button */}
    {/* <button
      onClick={() => alert(`Delete Notification ${notification._id}`)}
      className="opacity-70 hover:opacity-100 text-red-400 hover:text-red-300
                 transition duration-200 p-2 rounded-lg hover:bg-red-400/10"
    >
      <Trash2 size={20} />
    </button> */}
  </div>

  {/* Divider */}
  <div className="border-b border-gray-700/60 my-4 group-hover:border-gray-600"></div>

  {/* Description */}
  <p className="text-gray-300 leading-relaxed">
    {notification.description}
  </p>
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
