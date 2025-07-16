import React, { useState } from "react";
import { Link } from "react-router-dom";
import sidebarRouteList from "../../routes/routeList";
import { useServerHealth } from '../../hooks/usePolling'; 
const URL=import.meta.env.VITE_API_URL; 
const ServerHealthChecker = ({ url }: { url: string }) => { 
const status = useServerHealth(url, 5000); 
return <><div className="flex items-center "> <span className={`h-3 w-3 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span></div> 
</> 
}; 
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-blue-600 p-4">
   
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Dashboard
        </Link>
        <div className="hidden md:flex space-x-4">
        <ServerHealthChecker url={`${URL}/health`}/>
        <h2 className="text-white">Admin</h2>
          <Link to="/logout" className="text-white">
            Logout
          </Link>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Mobile Header"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          {sidebarRouteList.map((route) => (
          <Link to={route.link} key={route.link} className="block text-white py-2">
          {route.name}
        </Link>
          ))}
         
        </div>
      )}
    </header>
  );
};

export default Header;
