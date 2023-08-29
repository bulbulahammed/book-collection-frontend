import { Link } from "react-router-dom";
import { defaultState } from "../redux/feature/user/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

export default function Navbar() {
  const { email } = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(defaultState());
    localStorage.removeItem("token");
  };

  return (
    <>
      <div
        className="navbar sticky"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          fontFamily: "'Kalam', cursive",
        }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allBooks">All Books</Link>
              </li>
              <li>
                <Link to="/recentBooks">Recent Books</Link>
              </li>
              <li>
                {email ? <span>{email}</span> : <a>Account</a>}
                <ul className="p-2">
                  {email ? (
                    <li>
                      <span onClick={handleLogout}>Logout</span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/signup">Sign Up</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/">
            <a className="normal-case text-xl">Books</a>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allBooks">All Books</Link>
            </li>
            <li>
              <Link to="/recentBooks">Recent Books</Link>
            </li>
            <li tabIndex={0}>
              <details>
                {email ? (
                  <summary>{email}</summary>
                ) : (
                  <summary>Account</summary>
                )}
                <ul className="p-2">
                  {email ? (
                    <li>
                      <span onClick={handleLogout}>Logout</span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/signup">Sign Up</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
