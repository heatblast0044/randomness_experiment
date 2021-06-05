import React from "react";

export default function Button(props) {
  const onClick = (e) => {
    props.setCount((prev) => prev++);
    props.record[e.target.name] = (props.record[e.target.name] || 0) +1
    props.setRecord()
  };

  return (
    <div>
      <button name={props.name} onClick={onClick}></button>
    </div>
  );
}
