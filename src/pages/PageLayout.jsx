import React from "react";
import "../styles/PageLayout.css";

const PageLayout = ({ title, children }) => {
  return (
    <div className="page-layout">
      <h1 className="page-title">{title}</h1>
      <div className="page-content">{children}</div>
    </div>
  );
};

export default PageLayout;