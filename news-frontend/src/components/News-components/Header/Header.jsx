/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {PropTypes} from 'prop-types'
import {
  auth,
  createUser,
  getUsers,
  logOut,
} from "../../../features/usersReducer";
import "./styles.css";

const Header = ({ text, setText }) => {
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [join, setJoin] = useState(false);
  const [registerOn, setRegisterOn] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector(state => state.users.token)
  const name = localStorage.getItem("name");

  console.log({text, setText})

  Header.propTypes = {
    text: PropTypes.string,
    setText: PropTypes.func,
  } 

  const dispatch = useDispatch();

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitJoin = () => {
    if (login !== "" && password !== "") {
      dispatch(auth({ login, password }));
      setLogin("");
      setPassword("");
      setJoin(false);
      setRegisterOn(false);
    }
  };

  const handleSubmitRegister = () => {
    if (login !== "" && password !== "") {
      dispatch(createUser({ login, password }));
      setLogin("");
      setPassword("");
      setJoin(true);
      setRegisterOn(false);
    }
  };

  function handleLogout() {
    if (token) {
      dispatch(logOut());
    }
  }

  function handleText(e) {
    setText(e.target.value);
  }

  function handleSearch() {
    setJoin(false);
    setRegisterOn(false);
    setSearch(!search);
  }

  function handleJoin() {
    setRegisterOn(false);
    setSearch(false);
    setJoin(!join);
  }

  function handleRegister() {
    setSearch(false);
    setRegisterOn(!registerOn);
  }

  function handleSidebar() {
    setSidebar(!sidebar);
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div>
        {sidebar ? (
          <div className="sidenav">
            <button className="close-sidebar" onClick={handleSidebar}>
              x
            </button>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </div>
        ) : (
          ""
        )}
        <button className="sidebar-button" onClick={handleSidebar}></button>
        <div className="search-block">
          <div className="search-img" onClick={handleSearch}></div>
          {search ? (
            <div className="openSearch">
              Что будем искать?
              <input
                onChange={handleText}
                value={text}
                className="search-input"
                type="text"
              />
            </div>
          ) : (
            ""
          )}

          {token ? (
            <button onClick={handleLogout} className="join-butt">
              {name}
            </button>
          ) : (
            <button onClick={handleJoin} className="join-button">
              Войти
            </button>
          )}

          {join ? (
            <div className="join-block">
              <div className="vhod">Вход</div>
              Логин
              <input type="text" value={login} onChange={handleChangeLogin} />
              Пароль
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
              <div className="go-to-signup">
                Нет аккаунта?{" "}
                <button onClick={handleRegister} className="signup-button">
                  Зарегистрируйтесь
                </button>
              </div>
              <button onClick={handleSubmitJoin} className="join-button-2">
                Вход
              </button>
            </div>
          ) : (
            ""
          )}
          {registerOn ? (
            <div className="join-block">
              <div className="vhod">Регистрация</div>
              Логин
              <input type="text" value={login} onChange={handleChangeLogin} />
              Пароль
              <input
                type="password"
                value={password}
                onChange={handleChangePassword}
              />
              <div className="go-to-signup">
                Есть аккаунт?{" "}
                <button onClick={handleRegister} className="signup-button">
                  Войдите
                </button>
              </div>
              <button onClick={handleSubmitRegister} className="join-button-2">
                Регистрация
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <hr className="header-hr" />
        <Link to="/" className="global-title">
          The World Press
        </Link>
      </div>
    </>
  );
};

export default Header;
