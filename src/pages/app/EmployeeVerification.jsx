import React from "react";
import { useNavigate } from "react-router";
import {
  FaChevronRight,
  FaRegEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { HiDownload } from "react-icons/hi";

const EmployeeVerification = () => {
  const navigate = useNavigate();

  // Static employee data
  const employee = {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    gender: "Female",
    phone: "+1 (555) 123-4567",
    dob: "1992-07-18",
    profileImage: "https://randomuser.me/api/portraits/women/50.jpg",
    jobTitle: "Software Engineer",
    experience: "5 years",
    industryFocus: "Information Technology",
    preferredJobTypes: ["Full-time", "Remote"],
    availability: "Immediate",
    shiftType: "Day",
    openToTraveling: "Yes",
    rationalShifts: "No",
    documents: [
      { name: "Completions Resume", size: "2.3 Mb", type: "PDF", url: "#" },
      { name: "Engineering Resume", size: "2.3 Mb", type: "PDF", url: "#" },
      { name: "Degree Certificate", size: "1.8 Mb", type: "PDF", url: "#" },
    ],
    verificationStatus: "Pending", // 'Verified' or 'Pending'
  };

  const handleEdit = () => alert("Edit employee details");
  const handleDelete = () =>
    window.confirm("Are you sure you want to delete this employee?") &&
    alert("Employee deleted");
  const handleVerify = () => alert("Employee verified successfully!");

  return (
    <div className="p-6 pt-0 min-h-screen  text-white">
      {/* Header */}
      <div className="background-gradients relative p-6 rounded-xl shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Employee Verification</h1>
        </div>
      </div>

      {/* Employee Info Card */}
      <div className="border border-gray-700 background-gradient p-4 pt-4 rounded-xl mt-6 space-y-10">
        {/* Header Section */}
       {/* Employee Overview Card */}


{/* Employee Details Grid */}
{/* Employee Overview Section */}
<div className="bg-[#0C111D] border border-gray-700 rounded-xl p-6 relative">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">Sid Michael</h2>
            <p className="text-gray-400 text-sm">Oil Rig Operator</p>
          </div>
          <FaStar className="ml-auto text-[#DAB462] w-6 h-6" />
        </div>
      </div>

{/* Employee Details Grid */}
<div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
  <div>
    <p className="text-gray-400">Number</p>
    <p className="font-semibold mt-1 text-white">{employee.phone}</p>
    <p className="text-xs text-gray-400">{employee.email}</p>
  </div>

  <div>
    <p className="text-gray-400">Experience</p>
    <p className="font-semibold mt-1 text-white">{employee.experience}</p>
  </div>

  <div>
    <p className="text-gray-400">Preferred Job Type</p>
    <p className="font-semibold mt-1 text-white">
      {employee.preferredJobTypes[0]}
    </p>
    {employee.preferredJobTypes.length > 1 && (
      <p className="text-[#DAB462] font-semibold cursor-pointer mt-1">
        +{employee.preferredJobTypes.length - 1}
      </p>
    )}
  </div>

  <div>
    <p className="text-gray-400">Availability</p>
    <p className="font-semibold mt-1 text-white">
      {employee.availability}
    </p>
    <p className="text-xs text-gray-400">{employee.shiftType}</p>
  </div>

  <div>
    <p className="text-gray-400">Gender</p>
    <p className="font-semibold mt-1 text-white">{employee.gender}</p>
    <p className="text-xs text-gray-400">DOB: {new Date(employee.dob).toLocaleDateString()}</p>
  </div>

  <div>
    <p className="text-gray-400">Industry Focus</p>
    <p className="font-semibold mt-1 text-white">{employee.industryFocus}</p>
  </div>

  <div>
    <p className="text-gray-400">Open to Traveling</p>
    <p className="font-semibold mt-1 text-white">
      {employee.openToTraveling}
    </p>
  </div>

  <div>
    <p className="text-gray-400">Rational Shifts</p>
    <p className="font-semibold mt-1 text-white">{employee.rationalShifts}</p>
  </div>
</div>



        {/* Documents Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <IoIosPaper className="text-[#DAB462] w-5 h-5" />
            Documents
          </h3>

          <div className="space-y-4 ">
            {employee.documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center bg-[#0C111D] justify-between  border border-gray-700 rounded-xl p-4 hover:border-[#DAB462] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 text-white text-sm px-3 py-2 rounded-lg">
                    {doc.type}
                  </div>
                  <div>
                    <p className="font-semibold flex items-center gap-1">
                      {doc.name}
                      {doc.name.includes("Completions") && (
                        <FaStar className="text-[#DAB462] w-4 h-4 inline" />
                      )}
                    </p>
                    <p className="text-xs text-gray-400">{doc.size}</p>
                  </div>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition"
                >
                  <HiDownload className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex  justify-end gap-6 pt-6">
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
          {employee.verificationStatus === "Pending" && (
            <button
              onClick={handleVerify}
              className="px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold transition text-white flex items-center space-x-3"
            >
              <FaChevronRight />
              <span>Verify</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeVerification;
