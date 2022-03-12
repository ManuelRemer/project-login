//styles
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(null);

  const handleClick = (e) => {
    const { id } = e.target;
    console.log(e.target.className);
    setClicked(id);
  };

  return (
    <div className="navbar">
      <ul>
        <li className="navbar_title">
          <h1>In/Out</h1>
        </li>
        <li className="navbar_links" onClick={handleClick}>
          <Link to="/login">
            <button
              onClick={() => console.log("Hello")}
              id="login"
              className={`button ${
                clicked === "login" ? "clicked" : "not-clicked"
              }`}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              id="signup"
              className={`button ${
                clicked === "signup" ? "clicked" : "not-clicked"
              }`}
            >
              Signup
            </button>
          </Link>
          <button
            id="logout"
            className={`button ${
              clicked === "logout" ? "clicked" : "not-clicked"
            }`}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
