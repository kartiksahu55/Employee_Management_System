import React from "react";
import styleCss from "./PageLoader.module.css";

const PageLoader = () => {
  return (
    <>
      <span className={styleCss.loader}></span>
    </>
  );
};

export default PageLoader;