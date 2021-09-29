import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import sublinks from "./data";

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu, sublinks } =
    useGlobalContext();

  const displaySubmenu = (e) => {
    const target = e.target;
    const btnCoords = target.getBoundingClientRect();
    const center = (btnCoords.left + btnCoords.right) / 2;
    const bottom = btnCoords.bottom - 3;
    const page = target.textContent;
    openSubmenu(page, { center, bottom });
  };

  const hideSubmenu = (e) => {
    closeSubmenu();
  };
  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="stripe" className="nav-logo" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
          <ul className="nav-links">
            <li>
              <button
                className="link-btn"
                onMouseOver={displaySubmenu}
                onMouseout={hideSubmenu}
              >
                products
              </button>
            </li>
            <li>
              <button
                className="link-btn"
                onMouseOver={displaySubmenu}
                onMouseout={hideSubmenu}
              >
                developers
              </button>
            </li>
            <li>
              <button
                className="link-btn"
                onMouseOver={displaySubmenu}
                onMouseout={hideSubmenu}
              >
                company
              </button>
            </li>
          </ul>
          <button className="btn signin-btn">sign in</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
