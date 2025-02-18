import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" bg-base-100 shadow-sm ">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Quiz</a>
        </div>
        <div className="dropdown navbar-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Quiz</NavLink>
            </li>
            <li>
              <NavLink to="/question">Question</NavLink>
            </li>
            <li>
              <NavLink to="/scoreboard">Scoreboard</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="flex gap-4 justify-center items-center py-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "font-bold text-primary" : "text-gray-800"
                }
              >
                Quiz
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/question"
                className={({ isActive }) =>
                  isActive ? "font-bold text-primary" : "text-gray-800"
                }
              >
                Question
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/scoreboard"
                className={({ isActive }) =>
                  isActive ? "font-bold text-primary" : "text-gray-800"
                }
              >
                Scoreboard
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
