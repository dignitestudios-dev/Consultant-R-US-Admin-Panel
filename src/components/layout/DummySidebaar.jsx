import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { sidebarData } from "../../static/Sidebar";
import { LogOut } from "lucide-react";
import { Logo, navlogo, sidebar } from "../../assets/export";

const DummySidebar = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    localStorage.clear();
    sessionStorage.clear();

    navigate("/auth/login");
  };

  return (
    <>
      {/* SIDEBAR */}
      <div
        className="w-72 h-full border-r overflow-y-auto pl-4 px-8 py-3 flex flex-col gap-4 border border-gray-700 background-gradients"
      >
        <img
          src={Logo}
          loading="lazy"
          alt="logo-organization"
          className="h-24 w-24 cursor-pointer mb-3 justify-center items-center mx-auto"
        />

        {sidebarData?.map((sidebar) => (
          <NavLink
            key={sidebar?.link}
            className={({ isActive }) =>
              isActive
                ? "text-[14px] font-medium flex items-center gap-4 px-6 py-3 rounded-full button-bg text-white transition-all"
                : "text-[14px] font-medium flex items-center gap-4 px-6 py-3 rounded-full text-white hover:bg-[#DAB462] transition-all"
            }
            to={sidebar?.link}
          >
            {sidebar?.icon}
            <span>{sidebar?.title}</span>
          </NavLink>
        ))}

        <hr className="border-t border-gray-600" />

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-sm font-medium flex items-center gap-4 px-[14px] py-3 rounded-full text-white hover:bg-[#DAB462] transition"
        >
          <LogOut className="ml-3" /> Logout
        </button>
      </div>

      {/* LOGOUT MODAL — moved OUTSIDE sidebar */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#0C111D] border border-gray-700 rounded-xl  shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-white mb-4">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default DummySidebar;
