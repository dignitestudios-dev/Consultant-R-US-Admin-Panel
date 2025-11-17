import React from "react";
import { FaStar } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useNavigate } from "react-router";

const UserDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6  text-white">
      {/* Back Button */}
      {/* <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-300 hover:text-white transition"
      >
        ← Back
      </button> */}
 <div className="background-gradients relative mb-4 p-6 rounded-xl text-white shadow-md border border-gray-700 overflow-hidden mt-4">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 button-bg rounded-t-3xl" />

        {/* Title + Icon */}
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] md:text-[36px] font-bold">Users Management</h1>
        </div>
      </div>
      {/* Profile Card */}
      <div className="bg-[#0C111D] border border-gray-700 rounded-xl p-6 relative">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/200"
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

      {/* Info Grid */}
      <div className="bg-[#0C111D] border border-gray-700 p-6 rounded-xl mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">

        <div>
          <p className="text-gray-400">Number</p>
          <p className="font-semibold mt-1">+15112221554</p>
          <p className="text-xs text-gray-400">Sidmichael@gmail.com</p>
        </div>

        <div>
          <p className="text-gray-400">Experience</p>
          <p className="font-semibold mt-1">04 Years</p>
        </div>

        <div>
          <p className="text-gray-400">Preferred Job Type</p>
          <p className="font-semibold mt-1">Software Developer</p>
          <p className="text-[#DAB462] font-semibold cursor-pointer mt-1">+3</p>
        </div>

        <div>
          <p className="text-gray-400">Availability</p>
          <p className="font-semibold mt-1">8 March to 9 Dec (9 Months)</p>
          <p className="text-xs text-gray-400">Full Time</p>
        </div>
      </div>

      {/* Resume Sections */}
      <div className="mt-8 space-y-8">
        {/* Completion Resumes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Completion Resumes</h3>

          <div className="flex items-center justify-between bg-[#111827] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white text-sm px-3 py-2 rounded-lg">PDF</div>
              <div>
                <p className="font-semibold flex items-center gap-1">
                  Completions <FaStar className="text-[#DAB462] inline w-4 h-4" />
                </p>
                <p className="text-xs text-gray-400">2.3 Mb</p>
              </div>
            </div>
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition">
              <HiDownload className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Engineering Resumes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Engineering Resumes</h3>

          <div className="flex items-center justify-between bg-[#111827] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white text-sm px-3 py-2 rounded-lg">PDF</div>
              <div>
                <p className="font-semibold">Engineering</p>
                <p className="text-xs text-gray-400">2.3 Mb</p>
              </div>
            </div>
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition">
              <HiDownload className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDetails;
