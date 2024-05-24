import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaQuestion } from "react-icons/fa";
import { GiSevenPointedStar } from "react-icons/gi";
import { PiSignOutFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
function Navbar({setCurrentLink}) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    navigate("login");
  };
  return (
    <>
      <nav className="desktop">
        <Link to="#" onClick={logout}>
          <PiSignOutFill className="icon" /> Signout
        </Link>
      </nav>
    
    </>
  );
}

export default Navbar;
