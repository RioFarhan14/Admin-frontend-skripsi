import PropTypes from "prop-types";
import { Logout } from "../../service/user";
import DialogCustomAnimation from "../Elements/Popup";

const Header = ({ sidebarOpen, setSidebarOpen, variant = "default" }) => {
  return (
    <header
      className={`sticky top-0 before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-white/90 before:-z-10 z-30 ${
        variant === "v2" || variant === "v3"
          ? "before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 after:-z-10"
          : "max-lg:shadow-sm lg:before:bg-gray-100/90"
      } ${variant === "v2" ? "before:bg-gray-800" : ""} ${
        variant === "v3" ? "before:bg-gray-900" : ""
      }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 ${
            variant === "v2" || variant === "v3"
              ? ""
              : "lg:border-b border-gray-200"
          }`}>
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}>
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div>
            <DialogCustomAnimation
                        title="Logout"
                        name="Logout"
                        desc="Apakah Anda yakin ingin keluar dari aplikasi ini?"
                        handlePopup={() => {
                          Logout();
                          localStorage.removeItem("token");
                          window.location.href = "/";}}
                      />
              {/* <Button
                buttonheight={"h-10"}
                onClick={() => {
                  
                }}
                bgColor="bg-white  border-2 border-red-500"
                textColor="shrink-0 fill-current text-red-500 hover:text-white">
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    id="logout">
                    <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"></path>
                  </svg>
                  <span className="hidden sm:block text-red-500">Logout</span>
                </div>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "v2", "v3"]),
};

export default Header;
