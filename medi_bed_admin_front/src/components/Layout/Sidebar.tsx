import React from "react";
import { Link } from "react-router-dom";
import { sidebarRouteList } from "../../routes/routeList";
const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-blue-600 p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:w-64`}
    >
      <nav className="space-y-4">
        <Link to="/" className="block text-white">
          Home
        </Link>
        {sidebarRouteList.map((route) => (
          <Link to={route.link} key={route.link} className="block text-white">
            {route.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
