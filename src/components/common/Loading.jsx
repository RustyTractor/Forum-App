import React from "react";
import LoadingImg from "../../assets/loader.gif";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vW",
      }}
    >
      <img style={{ width: "10%" }} src={LoadingImg} alt="Loading..." />
    </div>
  );
};

export default Loading;
