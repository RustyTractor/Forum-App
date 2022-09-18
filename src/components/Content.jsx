import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Content = () => {
  return (
    <div className="content">
      <Header />
      <Outlet></Outlet>
    </div>
  );
};

export default Content;
