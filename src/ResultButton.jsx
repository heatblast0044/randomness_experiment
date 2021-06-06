import React from "react";

export default function ResultButton(props) {
  return (
    <div className="res">
      <button name={props.name}>{props.name}</button>
      <div className="resUnit">
        <span>
          {props.count
            ? (props.record[props.name] / props.count).toFixed(4)
            : 0}
        </span>
        <span className="resValue">{props.record[props.name]}</span>
        <span className="resCaption">TIMES</span>
        <span className="resCaption">PRESSED</span>
      </div>
    </div>
  );
}
