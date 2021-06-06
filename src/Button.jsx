import React from "react";

export default function Button(props) {
  const onClick = (e) => {
    props.setCount((prev) => prev + 1);
    props.setRecord({
      ...props.record,
      [e.target.name]: props.record[e.target.name] + 1,
    });
    props.setOrder(c=>[...c, e.target.name])
  };

  return (
    <div className={props.className}>
      <button name={props.name} onClick={onClick}></button>
    </div>
  );
}
