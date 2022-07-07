/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import "./styles.css";

const Header = () => {
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false)

  function handleSearch() {
    setSearch(!search);
  }

  function handleSidebar() {
    setSidebar(!sidebar)
  }

  return (
    <div>
        {sidebar ? 
      <div class="sidenav">
        <button className="close-sidebar" onClick={handleSidebar}>x</button>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div> : ''
}
      <button className="sidebar-button" onClick={handleSidebar}></button>
      <div className="search-block">
        <div className="search-img" onClick={handleSearch}></div>
        {search ? (
          <div className="openSearch">
            Что будем искать?
            <input className="search-input" type="text" />
          </div>
        ) : (
          ""
        )}
        <button className="join-button">Войти</button>
      </div>
      <hr className="header-hr" />
      <div className="global-title">The World Press</div>
    </div>
  );
};

export default Header;
