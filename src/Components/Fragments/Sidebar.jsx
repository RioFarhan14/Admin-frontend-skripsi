import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ sidebarOpen, setSidebarOpen, variant = "default" }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close if the ESC key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-primary p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200"
            : "rounded-tr-2xl shadow-sm"
        }`}>
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}>
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/dashboard" className="block">
            <img
              src="../assets/DashboardLogo.png"
              className="w-full h-full object-cover"
              alt="AM Futsal"
            />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true">
                •••
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-3 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  pathname.includes("dashboard") &&
                  "from-violet-500/[0.12] to-violet-500/[0.04]"
                }`}>
                <NavLink
                  end
                  to="/dashboard"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("dashboard")
                      ? "text-orange-500"
                      : "text-white"
                  }`}>
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/dashboard" ||
                        pathname.includes("dashboard")
                          ? "text-orange-500"
                          : "text-white"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      id="dashboard">
                      <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
                    </svg>
                    <span className="text-lg font- ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Management-field */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-3 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  pathname.includes("management-field") &&
                  "from-violet-500/[0.12] to-violet-500/[0.04]"
                }`}>
                <NavLink
                  end
                  to="/management-field"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("management-field")
                      ? "text-orange-500"
                      : "text-white"
                  }`}>
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname.includes("management-field")
                          ? "text-orange-500"
                          : "text-white"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 30 30">
                      <path d="M25,2h-4H11H7C6.45,2,6,2.45,6,3v26c0,0.55,0.45,1,1,1h4h10h4c0.55,0,1-0.45,1-1V3C26,2.45,25.55,2,25,2z M20,4v3h-8V4H20z    M10,4v4c0,0.55,0.45,1,1,1h10c0.55,0,1-0.45,1-1V4h2v11h-3.1c-0.46-2.28-2.48-4-4.9-4s-4.43,1.72-4.9,4H8V4H10z M13.18,15   c0.41-1.16,1.51-2,2.82-2s2.4,0.84,2.82,2H13.18z M18.82,17c-0.41,1.16-1.51,2-2.82,2s-2.4-0.84-2.82-2H18.82z M12,28v-3h8v3H12z    M22,28v-4c0-0.55-0.45-1-1-1H11c-0.55,0-1,0.45-1,1v4H8V17h3.1c0.46,2.28,2.48,4,4.9,4s4.43-1.72,4.9-4H24v11H22z" />
                    </svg>

                    <span className="text-lg font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Manajemen <br /> Lapangan
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Membership */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-3 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  pathname.includes("membership") &&
                  "from-violet-500/[0.12] to-violet-500/[0.04]"
                }`}>
                <NavLink
                  end
                  to="/membership"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("membership")
                      ? "text-orange-500"
                      : "text-white"
                  }`}>
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/membership" ||
                        pathname.includes("membership")
                          ? "text-purple-500"
                          : "text-white"
                      }`}
                      id="membership"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        opacity="0.5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.6872 14.0932L19.8706 12.3885C19.9684 11.479 20.033 10.8784 19.9823 10.5C19.5357 10.4948 19.1359 10.2944 18.8645 9.98019C18.5384 10.1814 18.1122 10.6061 17.4705 11.2452C16.9762 11.7376 16.729 11.9838 16.4533 12.0219C16.3005 12.0431 16.1449 12.0213 16.0038 11.9592C15.7492 11.8471 15.5794 11.5427 15.2399 10.934L13.4505 7.72546C13.241 7.3499 13.0657 7.03565 12.9077 6.78271C12.6353 6.92169 12.3268 7.00006 12 7.00006C11.6732 7.00006 11.3647 6.92169 11.0923 6.78272C10.9343 7.03566 10.759 7.34991 10.5495 7.72547L8.76006 10.934C8.42056 11.5427 8.25081 11.8471 7.99621 11.9592C7.85514 12.0213 7.69947 12.0431 7.5467 12.0219C7.27097 11.9838 7.02381 11.7376 6.5295 11.2452C5.88785 10.6061 5.46157 10.1814 5.13553 9.98019C4.86406 10.2944 4.46434 10.4948 4.01771 10.5C3.96702 10.8784 4.03162 11.479 4.12945 12.3885L4.3128 14.0932C4.34376 14.3809 4.37312 14.6645 4.40192 14.9425C4.65422 17.3783 4.86292 19.3932 5.71208 20.1532C6.65817 21.0001 8.07613 21.0001 10.9121 21.0001H13.0879C15.9239 21.0001 17.3418 21.0001 18.2879 20.1532C19.1371 19.3932 19.3458 17.3783 19.5981 14.9426C19.6269 14.6645 19.6562 14.3809 19.6872 14.0932Z"
                      />
                      <path d="M20 10.5C20.8284 10.5 21.5 9.82843 21.5 9C21.5 8.17157 20.8284 7.5 20 7.5C19.1716 7.5 18.5 8.17157 18.5 9C18.5 9.37466 18.6374 9.71724 18.8645 9.98013C19.1359 10.2944 19.5357 10.4947 19.9823 10.4999L20 10.5Z" />
                      <path d="M12 3C10.8954 3 10 3.89543 10 5C10 5.77778 10.444 6.45187 11.0923 6.78265C11.3647 6.92163 11.6732 7 12 7C12.3268 7 12.6353 6.92163 12.9077 6.78265C13.556 6.45187 14 5.77778 14 5C14 3.89543 13.1046 3 12 3Z" />
                      <path d="M2.5 9C2.5 9.82843 3.17157 10.5 4 10.5L4.01771 10.4999C4.46434 10.4947 4.86406 10.2944 5.13553 9.98012C5.36264 9.71724 5.5 9.37466 5.5 9C5.5 8.17157 4.82843 7.5 4 7.5C3.17157 7.5 2.5 8.17157 2.5 9Z" />
                      <path d="M4.84862 18.25C4.75064 17.7997 4.67228 17.2952 4.60254 16.75H19.3968C19.327 17.2952 19.2487 17.7997 19.1507 18.25H4.84862Z" />
                    </svg>
                    <span className="text-lg font- ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Membership
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Reports */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-3 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  pathname.includes("report") &&
                  "from-violet-500/[0.12] to-violet-500/[0.04]"
                }`}>
                <NavLink
                  end
                  to="/report"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("report")
                      ? "text-orange-500"
                      : "text-white"
                  }`}>
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/report" || pathname.includes("report")
                          ? "text-purple-500"
                          : "text-white"
                      }`}
                      id="report"
                      width="25"
                      height="25"
                      viewBox="0 0 512 512"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd">
                        <g
                          id="add"
                          fill={`${
                            pathname === "/report" ||
                            pathname.includes("report")
                              ? "#f97316"
                              : "#ffffff"
                          }`}
                          transform="translate(42.666667, 85.333333)">
                          <path
                            d="M341.333333,0 L426.666667,85.333333 L426.666667,341.333333 L0,341.333333 L0,0 L341.333333,0 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666667,234.666667 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z M170.666667,149.333333 L170.666667,213.333333 L128,213.333333 L128,149.333333 L170.666667,149.333333 Z M234.666667,106.666667 L234.666667,213.333333 L192,213.333333 L192,106.666667 L234.666667,106.666667 Z M298.666667,170.666667 L298.666667,213.333333 L256,213.333333 L256,170.666667 L298.666667,170.666667 Z"
                            id="Combined-Shape"
                          />
                        </g>
                      </g>
                    </svg>
                    <span className="text-lg font- ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Laporan
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Management-account */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-3 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  pathname.includes("management-account") &&
                  "from-violet-500/[0.12] to-violet-500/[0.04]"
                }`}>
                <NavLink
                  end
                  to="/management-account"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("management-account")
                      ? "text-orange-500"
                      : "text-white"
                  }`}>
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/management-account" ||
                        pathname.includes("management-account")
                          ? "text-orange-500"
                          : "text-white"
                      }`}
                      height="24"
                      width="24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 297 297"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      enableBackground="new 0 0 297 297">
                      <g>
                        <path d="m112.632,185.074l6.88-3.972c2.804-1.619 3.765-5.205 2.146-8.01l-13.036-22.579c-1.086-1.881-3.057-2.933-5.083-2.933-0.995,0-2.003,0.253-2.926,0.787l-6.88,3.972c-0.945,0.545-1.947,0.794-2.923,0.794-3.063,0-5.872-2.449-5.872-5.872v-7.944c0-3.238-2.625-5.864-5.864-5.864h-26.073c-3.238,0-5.864,2.625-5.864,5.864v7.944c0,3.423-2.81,5.872-5.872,5.872-0.976,0-1.978-0.249-2.923-0.794l-6.88-3.972c-0.923-0.533-1.932-0.786-2.926-0.787-2.027,0-3.997,1.052-5.083,2.933l-13.036,22.579c-1.619,2.805-0.658,6.391 2.146,8.01l6.88,3.972c3.909,2.257 3.909,7.899 0,10.156l-6.88,3.972c-2.805,1.619-3.765,5.205-2.146,8.01l13.036,22.579c1.086,1.881 3.057,2.933 5.083,2.933 0.995,0 2.003-0.254 2.926-0.787l6.88-3.972c0.945-0.545 1.947-0.794 2.923-0.794 3.063,0 5.872,2.449 5.872,5.872v7.944c0,3.238 2.625,5.864 5.864,5.864h26.072c3.238,0 5.864-2.625 5.864-5.864v-7.944c0-3.423 2.81-5.872 5.872-5.872 0.976,0 1.978,0.249 2.923,0.794l6.88,3.972c0.923,0.533 1.932,0.787 2.926,0.787 2.027,0 3.997-1.052 5.083-2.933l13.036-22.579c1.619-2.805 0.658-6.391-2.146-8.01l-6.88-3.972c-3.908-2.257-3.908-7.9 0.001-10.156zm-46.594,22.474c-9.608,0-17.396-7.789-17.396-17.396 0-9.608 7.789-17.396 17.396-17.396s17.396,7.789 17.396,17.396c0,9.607-7.789,17.396-17.396,17.396z" />
                        <path d="m108.109,23.659c-3.146-3.144-8.243-3.144-11.389,0-3.145,3.146-3.145,8.244 0,11.389l14.39,14.389c-52.889,2.619-95.701,44.162-100.334,96.506l1.19-2.062c3.406-5.9 9.756-9.565 16.57-9.564 0.144,0 0.287,0.013 0.431,0.017 9.074-37.721 41.965-66.251 81.815-68.729l-14.062,14.061c-3.145,3.145-3.145,8.244 0,11.389 1.573,1.572 3.633,2.358 5.694,2.358s4.122-0.786 5.694-2.358l28.004-28.004c1.51-1.511 2.358-3.559 2.358-5.694 0-2.136-0.848-4.184-2.358-5.694l-28.003-28.004z" />
                        <path d="m209.868,64.857c17.881,0 32.428-14.547 32.428-32.428 0-17.882-14.547-32.429-32.428-32.429-17.881,0-32.428,14.547-32.428,32.428 0,17.881 14.547,32.429 32.428,32.429z" />
                        <path d="m273.039,152.276v-44.58c0-12.34-7.93-23.283-19.657-27.124l-.054-.018-17.152-2.84c-1.46-0.449-3.02,0.324-3.545,1.764l-19.462,53.399c-1.123,3.081-5.48,3.081-6.602,0l-19.462-53.399c-0.424-1.163-1.522-1.892-2.698-1.892-0.279,0-17.999,2.964-17.999,2.964-11.823,3.94-19.723,14.9-19.723,27.294v44.432c0,6.659 5.398,12.056 12.056,12.056h102.241c6.66-2.84217e-14 12.057-5.398 12.057-12.056z" />
                        <path d="m287.37,162.933c-0.673,9.215-8.233,14.858-17.45,15.526-7.062,40.425-41.207,71.64-82.979,74.237l14.061-14.061c3.145-3.146 3.145-8.244 0-11.389-3.146-3.144-8.243-3.144-11.389,0l-28.003,28.004c-3.145,3.146-3.145,8.244 0,11.389l28.003,28.003c1.573,1.572 3.633,2.358 5.694,2.358s4.122-0.786 5.694-2.358c3.145-3.145 3.145-8.244 0-11.389l-14.389-14.389c56.028-2.774 100.758-49.227 100.758-105.931z" />
                        <path d="m216.936,77.105c-0.747-0.814-1.84-1.224-2.946-1.224h-8.245c-1.105,0-2.198,0.41-2.946,1.224-1.157,1.261-1.325,3.082-0.504,4.505l4.407,6.644-2.063,17.405 4.063,10.808c0.396,1.087 1.933,1.087 2.33,0l4.063-10.808-2.063-17.405 4.407-6.644c0.822-1.423 0.654-3.244-0.503-4.505z" />
                      </g>
                    </svg>
                    <span className="text-lg font- ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Manajemen <br /> Akun
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Notification */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-3 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  pathname.includes("notification") &&
                  "from-violet-500/[0.12] to-violet-500/[0.04]"
                }`}>
                <NavLink
                  end
                  to="/notification"
                  className={`block text-white truncate transition duration-150 ${
                    pathname.includes("notification")
                      ? "text-orange-500"
                      : "text-white"
                  }`}>
                  <div className="flex items-center">
                    <svg
                      className={`shrink-0 fill-current ${
                        pathname === "/notification" ||
                        pathname.includes("notification")
                          ? "text-orange-500"
                          : "text-white"
                      }`}
                      height="24"
                      width="24"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 611.999 611.999"
                      xmlSpace="preserve">
                      <g>
                        <g>
                          <g>
                            <path
                              d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203
				C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578
				c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626
				h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856
				c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626
				C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32
				c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082
				c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z
				 M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826
				c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485
				c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"
                            />
                            <path
                              d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258
				c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258
				C323.259,126.96,315.532,119.235,306.001,119.235z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span className="text-lg font- ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Notifikasi
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["default", "v2"]),
};

export default Sidebar;
