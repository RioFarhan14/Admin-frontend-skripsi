import { useState } from "react";
import Sidebar from "../Fragments/Sidebar";
import Header from "../Fragments/Header";
import PropTypes from "prop-types";
const MainLayouts = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          variant="v2"
        />
        {children}

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          <p>
            &copy; {new Date().getFullYear()} AM Futsal. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

MainLayouts.propTypes = {
  children: PropTypes.node,
};
export default MainLayouts;
