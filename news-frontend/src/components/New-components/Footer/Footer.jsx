import React from "react";
import "./styles.css";
import logo from "../../../assets/img/logo.svg";
import logo2 from "../../../assets/img/ins.svg"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-background">
        <img alt="" src={logo} className="logo"></img>
        <div  className="phone">+7 988 211 45 13</div>
        <div className="shield">Все права защищены ©</div>
        <div className="mail">vasya-killer2010@yandex.ru</div>
        <img className="footer-img" alt="" src={logo2} />
      </div>
    </div>
  );
};

export default Footer;
