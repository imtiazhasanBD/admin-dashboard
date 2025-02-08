import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { LogOut } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="w-full h-screen inset-0 z-30 bg-black opacity-70 fixed lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-white text-gray-800 p-4 shadow-md w-64 h-full fixed top-0 transform transition-transform duration-500 ease-in-out z-40 
        ${isOpen ? "translate-x-0 left-0" : "-translate-x-full left-0"} 
        lg:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <X
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-xl text-violet-700 cursor-pointer lg:hidden"
        />
        <h2 className="text-2xl font-bold mb-12 text-violet-700 flex items-center gap-2">
          EletroMart
        </h2>
        <nav className="h-full flex flex-col pb-24 justify-between">
          <ul className="font-semibold">
            <li className="mb-4">
              <Link
                to="/"
                onClick={toggleSidebar}
                className={`hover:text-violet-700 flex items-center gap-2 p-2 ${
                  location.pathname === "/" ? "text-violet-700 bg-gray-100" : ""
                }`}
              >
                <MdDashboard size={"1.4rem"} />
                DashBoard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/users"
                onClick={toggleSidebar}
                className={`hover:text-violet-700 flex items-center gap-2 p-2 ${
                  location.pathname === "/users"
                    ? "text-violet-700 bg-gray-100"
                    : ""
                }`}
              >
                <LuUsers />
                All Users
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={toggleSidebar}
                className={`hover:text-violet-700 flex items-center gap-2 p-2 ${
                  location.pathname === "/products"
                    ? "text-violet-700 bg-gray-100"
                    : ""
                }`}
              >
                <MdOutlineProductionQuantityLimits />
                Products
              </Link>
            </li>
          </ul>
          <button className="flex gap-2 items-center font-semibold hover:text-indigo-700 text-sm">
            <LogOut size={18}/>
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
