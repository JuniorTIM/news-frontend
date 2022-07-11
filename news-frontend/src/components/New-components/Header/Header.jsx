/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = ({text, setText}) => {
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false)
  const news = useSelector(state => state.news.news)

  function handleText(e) {
    setText(e.target.value)
  }

  function handleSearch() {
    setSearch(!search);
  }

  function handleSidebar() {
    setSidebar(!sidebar)
  }

  return (
    <div>
        {sidebar ? 
      <div className="sidenav">
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
            <input onChange={handleText} value={text} className="search-input" type="text" />
          </div>
        ) : (
          ""
        )}
        <button className="join-button">Войти</button>
      </div>
      <hr className="header-hr" />
      <Link to='/' className="global-title">The World Press</Link>
    </div>
  );
};

export default Header;
