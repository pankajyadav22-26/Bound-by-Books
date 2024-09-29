import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between min-h-full lg:h-screen">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-24 w-24 rounded-full object-cover" alt="Avatar" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold text-center">{data.username}</p>
        <p className="mt-1 text-sm text-zinc-300 text-center">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-4 lg:mt-0">
        {role === "user" && (
          <>
            <Link
              to="/profile"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Settings
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link
              to="/profile"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              All Orders
            </Link>
            <Link
              to="/profile/add-book"
              className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
            >
              Add Book
            </Link>
          </>
        )}
      </div>

      <button
        className="bg-zinc-900 w-3/4 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear();
          history("/");
        }}
      >
        Log Out <FaArrowRightFromBracket className="ml-2" />
      </button>
    </div>
  );
};

export default Sidebar;