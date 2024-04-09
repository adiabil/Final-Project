import React from "react";
import HeaderTop from "../HeaderTop/HeaderTop";
import Navbar from "../../Shared/Navbar/Navbar";
import "./Header.css";

const Header = (current) => {
  console.log(current)
  return (
    <header style={{ padding: "0 20px" }}>
      <Navbar current={current.current}></Navbar>
      <HeaderTop></HeaderTop>
      {}
    </header>
  );
};

export default Header;
