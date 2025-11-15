import React from "react";
import "../styles/common.css";
import PageLayout from "./PageLayout";

const HomePage = () => {
  return (
    <PageLayout>
      <div className="tool-container home-page">
        <h2 className="tool-title">🏠 DevHub Prototype v6</h2>
        <p>
          DevHub에 오신 것을 환영합니다.<br />
          다양한 개발 보조 도구를 제공합니다.<br />
          상단 메뉴를 통해 원하는 기능을 이용하세요.
        </p>
      </div>
    </PageLayout>
  );
};

export default HomePage;