import React from "react";
import {
  FaUser,
  FaFileAlt,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { useParams, Link } from "react-router"; // corrected import

const ReportDetails = () => {
  const { id } = useParams();

  const reports = [
    {
      id: 1,
      type: "User",
      name: "John Doe",
      reporter: "Alice Smith",
      email: "john@example.com",
      reason: "Inappropriate language",
      reportDate: "Oct 3, 2025",
      status: "Pending",
    },
    {
      id: 2,
      type: "User",
      name: "Jane Roe",
      reporter: "Bob Johnson",
      email: "jane@example.com",
      reason: "Harassment",
      reportDate: "Oct 5, 2025",
      status: "Reviewed",
    },
    {
      id: 101,
      type: "Post",
      name: "Offensive Post Title",
      reporter: "Charlie Brown",
      owner: "Sarah Lee",
      reason: "Hate speech",
      reportDate: "Oct 6, 2025",
      status: "Pending",
    },
    {
      id: 102,
      type: "Post",
      name: "Spam Post",
      reporter: "David Wilson",
      owner: "John Smith",
      reason: "Spam / Advertising",
      reportDate: "Oct 4, 2025",
      status: "Reviewed",
    },
  ];

  const report = reports.find((r) => r.id === parseInt(id));

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 text-lg">
        Report not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full  text-white px-8 ">
      <div className="background-gradients relative mb-4 p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Report Details</h1>
        </div>
      </div>
      {/* Top Bar */}
      <div className="border background-gradients border-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Report #{report.id}
        </h1>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            report.status === "Pending"
              ? "bg-yellow-500/20 text-yellow-300"
              : "bg-green-500/20 text-green-300"
          }`}
        >
          {report.status}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12 mb-12">
        <DetailItem
          icon={<FaFileAlt className="text-blue-400" />}
          label="Report Type"
          value={report.type}
        />
        <DetailItem
          icon={<FaUser className="text-purple-400" />}
          label={report.type === "User" ? "Reported User" : "Reported Post"}
          value={report.name}
        />
        <DetailItem
          icon={<FaUser className="text-cyan-400" />}
          label="Reporter"
          value={report.reporter}
        />
        <DetailItem
          icon={<FaEnvelope className="text-green-400" />}
          label="Contact / Owner"
          value={report.type === "User" ? report.email : report.owner}
        />
        <DetailItem
          icon={<FaExclamationTriangle className="text-red-500" />}
          label="Reason"
          value={report.reason}
        />
        <DetailItem
          icon={<FaFileAlt className="text-gray-400" />}
          label="Reported On"
          value={report.reportDate}
        />
      </div>

      {/* Reason & Notes Section */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm mb-10">
        <h2 className="text-xl font-semibold mb-2">Report Summary</h2>
        <p className="text-gray-300 leading-relaxed">
          This {report.type.toLowerCase()} was reported by{" "}
          <span className="text-yellow-400 font-medium">{report.reporter}</span>{" "}
          on <span className="text-yellow-400">{report.reportDate}</span> for{" "}
          <span className="italic text-red-400">{report.reason}</span>. The
          current status of this report is{" "}
          <span
            className={`font-semibold ${
              report.status === "Pending"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {report.status}.
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2.5 rounded-lg font-medium border border-gray-500 hover:bg-gray-800 transition">
          Mark as Resolved
        </button>
        <button className="px-6 py-2.5 rounded-lg font-medium bg-red-600 hover:bg-red-700 transition">
          Close Report
        </button>
      </div>
    </div>
    </div>
  );
};

// Small reusable info display
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon && <div className="mt-1">{icon}</div>}
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-medium text-white">{value}</p>
    </div>
  </div>
);

export default ReportDetails;
