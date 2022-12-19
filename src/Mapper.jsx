import React from "react";

export default function Mapper(props) {
  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button>{props.from}</button>
      &#8594;
      <button>{props.to}</button>
    </div>
  );
}
