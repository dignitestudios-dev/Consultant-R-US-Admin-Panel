import React from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

const ReviewsPage = () => {
  const navigate = useNavigate();

  // Static sample data — replace with your backend data
  const companies = [
    {
      id: 1,
      name: "Tech Solutions Ltd.",
      logo: "https://placehold.co/600x400",
      reviews: [
        {
          id: 1,
          user: "John Doe",
          rating: 5,
          comment:
            "Excellent company to work with! Professional and responsive.",
          date: "2024-05-10",
        },
        {
          id: 2,
          user: "Jane Smith",
          rating: 4,
          comment: "Great team and fast delivery. Highly recommended.",
          date: "2024-06-02",
        },
      ],
    },
    {
      id: 2,
      name: "InnovateX Corp.",
      logo: "https://placehold.co/600x400",
      reviews: [
        {
          id: 1,
          user: "Alex Johnson",
          rating: 3,
          comment: "Good service, but could improve communication.",
          date: "2024-06-15",
        },
      ],
    },
  ];

  // Flatten all reviews and include company info
  const allReviews = companies
    .flatMap((company) =>
      company.reviews.map((review) => ({
        ...review,
        companyName: company.name,
        companyLogo: company.logo,
        companyId: company.id,
      }))
    )
    // Sort by date (newest first or oldest first)
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // chronological order (oldest → newest)

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteReview = (companyId, reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      alert(`Review ${reviewId} deleted from company ${companyId}`);
    }
  };

  return (
    <div className="p-6 pt-0 min-h-screen text-white">
      {/* Header */}
      <div className="background-gradients relative p-6 rounded-xl shadow-md border border-gray-700 overflow-hidden mt-4">
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">
            Review Management
          </h1>
          {/* <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
          >
            <FaChevronLeft />
            <span>Back</span>
          </button> */}
        </div>
      </div>

      {/* Total Reviews */}
      <div className="mt-6 background-gradients border border-gray-700 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold">
          Total Reviews: <span className="text-[#DAB462]">{allReviews.length}</span>
        </h2>
      </div>

      {/* All Reviews Chronologically */}
      <div className="mt-8 space-y-6">
        {allReviews.map((review) => (
          <div
            key={`${review.companyId}-${review.id}`}
            className="background-gradients border border-gray-700 p-6 rounded-xl flex items-start justify-between"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.companyLogo}
                alt={review.companyName}
                className="w-16 h-16 object-cover rounded-full border border-gray-600"
              />
              <div>
                <h3 className="text-2xl font-bold">{review.companyName}</h3>
                <p className="text-[#DAB462] font-semibold mt-1">
                  {review.user} — {review.rating}⭐
                </p>
                <p className="text-gray-300 text-sm">{review.date}</p>
                <p className="text-white mt-2">{review.comment}</p>
              </div>
            </div>

            <button
              onClick={() => handleDeleteReview(review.companyId, review.id)}
              className="text-red-500 hover:text-red-600 transition ml-4"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
