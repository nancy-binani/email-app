import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [selected, setSelected] = useState("read");

  const handleClick = (option) => {
    setSelected(option);
  };

  return (
    <header className="header">
      <span className="menu-options">Filter By:</span>
      <div className="filter_options">
        <span
           onClick={() => handleClick("unread")}
          className={`menu-options ${selected === "unread" ? "selected" : ""}`}
        >
          Unread
        </span>
        <span
          onClick={() => handleClick("read")}
          className={`menu-options ${selected === "read" ? "selected" : ""}`}
        >
          Read
        </span>
        <span
          onClick={() => handleClick("favourites")}
          className={`menu-options ${selected === "favourites" ? "selected" : ""}`}
        >
          Favourites
        </span>
      </div>
    </header>
  );
};

export default Header;
