// src/layouts/RootLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
