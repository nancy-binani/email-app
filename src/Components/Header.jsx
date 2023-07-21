import React, { useState } from "react";
import "./Header.css";

const Header = ({ setSelectedState, setShowEmail }) => {
  const [selected, setSelected] = useState("unread");

  const handleClick = (option) => {
    setSelected(option);
    setSelectedState(option);
  };
  const handleShowAllMails = () =>{
    setShowEmail(false);
    handleClick("all");
  }

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
          className={`menu-options ${
            selected === "favourites" ? "selected" : ""
          }`}
        >
          Favourites
        </span>
        <span onClick={handleShowAllMails}
        className={`menu-options ${selected === "all" ? "selected" : ""}`}>All</span>
      </div>
    </header>
  );
};

export default Header;
