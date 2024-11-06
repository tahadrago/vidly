import React from "react";
import { NavLink, Link } from "react-router-dom";
const Navbar = React.memo(({ user }) => {
  return (
    <nav className=" p-8 py-6 bg-gray-100 flex items-center space-x-6 md:text-lg">
      <Link to="/" className="text-xl font-semibold">
        Vidly
      </Link>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? "text-black font-semibold" : "text-gray-500 hover:text-gray-700"
        }
      >
        Movies
      </NavLink>
      <NavLink
        to="/customers"
        className={({ isActive }) =>
          isActive ? "text-black font-semibold" : "text-gray-500 hover:text-gray-700"
        }
      >
        Customers
      </NavLink>
      <NavLink
        to="/rentals"
        className={({ isActive }) =>
          isActive ? "text-black font-semibold" : "text-gray-500 hover:text-gray-700"
        }
      >
        Rentals
      </NavLink>
      {!user ? (
        <React.Fragment>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-gray-700"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-gray-700"
            }
          >
            Register
          </NavLink>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-gray-700"
            }
          >
            {user.name}
          </NavLink>
            <NavLink
              // onClick={}
            to="/logout"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "text-gray-500 hover:text-gray-700"
            }
          >
            Logout
          </NavLink>
        </React.Fragment>
      )}
    </nav>
  );
});

export default Navbar;
