// src/components/MainLayout.js
import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { loadState } from "../config/storage";

export const MainLayout = () => {
  const user = loadState("user");
  if (!user) return <Navigate to={"/login"} />;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[20%] p-6 bg-blue-500 text-white flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Link to="/" className="hover:text-blue-200">Home</Link>
            </li>
            <li className="mb-4">
              <Link to="/profile" className="hover:text-blue-200">Profile</Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="hover:text-blue-200">Settings</Link>
            </li>
            <li className="mb-4">
              <Link to="/support" className="hover:text-blue-200">Support</Link>
            </li>
          </ul>
        </nav>
        <div>
          <button className="w-full bg-red-600 py-2 rounded hover:bg-red-500">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[80%] p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};
