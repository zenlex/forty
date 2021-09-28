import { getByLabelText } from "@testing-library/dom";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
import sublinks from "./data";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <aside
      className={`${
        isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`}
    >
      <div className="sidebar">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-sublinks">
          {sublinks.map((obj, index) => {
            return (
              <article key={index}>
                <h4>{obj.page}</h4>
                {obj.links.map((link, index) => {
                  const { label, icon, url } = link;
                  return (
                    <a key={index} href={url}>
                      {icon}
                      {label}
                    </a>
                  );
                })}
              </article>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
